import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";
import {
  ShoppingCart,
  Check,
  Book as BookIcon,
  ChevronDown,
  Filter,
  X,
  Search,
} from "lucide-react";
import { useCart } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Book } from "@/lib/data";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const GOOGLE_SHEETS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1-6wJ99DtiM4AX-fMJZI5ko6MsnqkPSRbiaobrRHsq0M/export?format=csv&gid=2005555354";

/**
 * Parse a single CSV line, handling quoted fields
 */
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  values.push(current); // Push last value

  return values;
}

/**
 * Parse CSV string into array of objects
 * Handles quoted fields that may contain commas
 */
function parseCSV(csvText: string): Record<string, string>[] {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return [];

  // Parse header and trim each header name
  const headers = parseCSVLine(lines[0]).map((h) => h.trim());

  // Parse rows
  const rows: Record<string, string>[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    const values = parseCSVLine(line);
    if (values.length !== headers.length) continue;

    const row: Record<string, string> = {};
    headers.forEach((header, index) => {
      // Remove surrounding quotes if present
      let value = values[index] || "";
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      row[header] = value.trim();
    });
    rows.push(row);
  }

  return rows;
}

/**
 * Map CSV row to Book interface
 */
function mapCSVRowToBook(
  row: Record<string, string>,
  index: number,
): Book | null {
  // Get values directly - headers are already trimmed during parsing
  const title = row["Title"]?.trim();
  const author = row["Author"]?.trim();
  const age = row["Age"]?.trim();
  const type = row["Type"]?.trim();
  const condition = row["Condition"]?.trim();
  const priceStr = row["Price"]?.trim();
  const availability = row["Availability"]?.trim();
  const imageLink = row["image_link"]?.trim();

  // Debug: Log all fields and available keys
  console.log(`Row ${index} - Available keys:`, Object.keys(row));
  console.log(`Row ${index} fields:`, {
    title,
    author,
    age,
    type,
    condition,
    priceStr,
    availability,
    imageLink,
  });

  // Validate required fields
  if (!title || !author || !age || !type || !priceStr || !imageLink) {
    console.log(`Row ${index} failed: Missing required fields`);
    return null;
  }

  // Only include books that are in stock
  if (availability !== "In Stock") {
    console.log(
      `Row ${index} failed: Availability is "${availability}", expected "In Stock"`,
    );
    return null;
  }

  // Validate and parse price
  const price = parseInt(priceStr, 10);
  if (isNaN(price) || price < 0) {
    console.log(`Row ${index} failed: Invalid price "${priceStr}"`);
    return null;
  }

  // Validate age group - normalize common variations
  let normalizedAge = age;
  // Handle variations like "0-3 Yrs" or "0-3Yrs"
  normalizedAge = normalizedAge.replace(/\s*Yrs?\s*/i, "").trim();

  const validAgeGroups: Book["ageGroup"][] = ["0-3", "3-6", "6-8", "8-12"];
  if (!validAgeGroups.includes(normalizedAge as Book["ageGroup"])) {
    console.log(
      `Row ${index} failed: Invalid age group "${age}" (normalized: "${normalizedAge}")`,
    );
    return null;
  }

  // Validate condition
  const validConditions: Book["condition"][] = [
    "Like New",
    "Good",
    "Well Loved",
  ];
  if (!validConditions.includes(condition as Book["condition"])) {
    console.log(`Row ${index} failed: Invalid condition "${condition}"`);
    return null;
  }

  // Normalize type - "Board" should become "Board Book" for consistency
  let normalizedType = type;
  if (type === "Board") {
    normalizedType = "Board Book";
  }

  console.log(`Row ${index} SUCCESS: Creating book`, {
    title,
    normalizedAge,
    normalizedType,
    condition,
    price,
  });
  return {
    id: `book-${index}`,
    title,
    author,
    ageGroup: normalizedAge as Book["ageGroup"],
    type: normalizedType,
    condition: condition as Book["condition"],
    price,
    image: imageLink,
  };
}

/**
 * Fetch books from Google Sheets CSV
 */
async function fetchBooksFromCSV(): Promise<Book[]> {
  try {
    const response = await fetch(GOOGLE_SHEETS_CSV_URL);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch CSV: ${response.status} ${response.statusText}`,
      );
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    console.log("Parsed CSV rows:", rows.length);
    if (rows.length > 0) {
      console.log("First row sample:", rows[0]);
      console.log("First row keys:", Object.keys(rows[0]));
    }

    const books: Book[] = [];
    rows.forEach((row, index) => {
      const book = mapCSVRowToBook(row, index);
      if (book) {
        books.push(book);
      }
    });

    console.log("Total books parsed:", books.length);
    return books;
  } catch (error) {
    console.error("Error fetching books from CSV:", error);
    throw error;
  }
}

export default function Shop() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const activeFilter = searchParams.get("age") || "all";
  const activeType = searchParams.get("type") || "all";
  const searchQuery = searchParams.get("search") || "";

  // Local state for search input
  const [searchInput, setSearchInput] = useState(searchQuery);

  // Sync search input with URL parameter
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const { addItem, items } = useCart();

  // Fetch books from CSV - always fetch fresh data on page load
  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooksFromCSV,
    staleTime: 0, // Data is immediately stale
    gcTime: 0, // Don't cache the data
    refetchOnMount: true, // Always refetch when component mounts
  });

  const filteredBooks = books.filter((book) => {
    const ageMatch = activeFilter === "all" || book.ageGroup === activeFilter;

    // Type and Price Filter Logic
    let typeMatch = true;
    if (activeType === "below-50") {
      typeMatch = book.price < 50;
    } else if (activeType !== "all") {
      // Handle "Board Book" filter matching both "Board" and "Board Book"
      if (activeType === "Board Book") {
        typeMatch = book.type === "Board Book" || book.type === "Board";
      } else {
        typeMatch = book.type === activeType;
      }
    }

    // Search query logic
    const searchMatch =
      !searchQuery ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());

    return ageMatch && typeMatch && searchMatch;
  });

  // Debug: Log books count
  if (books.length > 0) {
    console.log("Books loaded:", books.length);
    console.log("Filtered books:", filteredBooks.length);
    console.log("Active filters:", {
      age: activeFilter,
      type: activeType,
      search: searchQuery,
    });
  }

  const handleAddToCart = (book: Book) => {
    addItem(book);
    toast.success(`${book.title} added to bag!`, {
      description: "You can DM all books together once you're done.",
      position: "bottom-center",
    });
  };

  const createFilterUrl = (params: {
    age?: string;
    type?: string;
    search?: string;
  }) => {
    const newParams = new URLSearchParams(searchParams);
    if (params.age) {
      if (params.age === "all") newParams.delete("age");
      else newParams.set("age", params.age);
    }
    if (params.type) {
      if (params.type === "all") newParams.delete("type");
      else newParams.set("type", params.type);
    }
    if (params.search !== undefined) {
      if (!params.search) newParams.delete("search");
      else newParams.set("search", params.search);
    }
    return `/shop?${newParams.toString()}`;
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    // Update URL immediately
    const newUrl = createFilterUrl({ search: value });
    setLocation(newUrl);
  };

  const ageLabels: Record<string, string> = {
    all: "All Ages",
    "0-3": "0-3 Yrs",
    "3-6": "3-6 Yrs",
    "6-8": "6-8 Yrs",
    "8-12": "8-12 Yrs",
  };

  const typeLabels: Record<string, string> = {
    all: "All Types",
    "Board Book": "Boards",
    Paperback: "Paperbacks",
    Hardcover: "Hardcovers",
    "Disney Marvel": "Disney Marvel",
    "General Knowledge": "General Knowledge",
    Phonics: "Phonics",
    "Activity Book": "Activity",
    "Collection of Stories": "Collection of Stories",
    "below-50": "Books below 50Rs",
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-2xl font-black text-muted-foreground mb-4">
                Loading books...
              </p>
              <p className="text-muted-foreground">
                Fetching latest collection from our inventory
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-2xl font-black text-destructive mb-4">
                Failed to load books
              </p>
              <p className="text-muted-foreground mb-4">
                Please try refreshing the page
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="rounded-full border-2 border-border font-bold h-12 px-8"
              >
                Refresh Page
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="w-full md:w-auto">
              <h1 className="text-4xl font-black mb-2">
                {searchQuery ? `Search: "${searchQuery}"` : "Shop Now"}
              </h1>
              <p className="text-muted-foreground font-bold">
                Found {filteredBooks.length} treasures
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              {/* Search Input */}
              <div className="relative w-full md:w-auto min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search books..."
                  value={searchInput}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleSearchChange(e.target.value)
                  }
                  className="rounded-full border-2 border-border font-bold h-12 pl-10 pr-4 w-full md:w-auto"
                />
              </div>

              {/* Age Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full border-2 border-border font-bold h-12 px-6 gap-2 min-w-[140px] justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-primary" />
                      {ageLabels[activeFilter]}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 border-2 border-border min-w-[180px]">
                  {Object.entries(ageLabels).map(([id, label]) => (
                    <DropdownMenuItem
                      key={id}
                      asChild
                      className="rounded-xl font-bold cursor-pointer"
                    >
                      <a
                        href={createFilterUrl({ age: id })}
                        className={cn(
                          activeFilter === id &&
                            "bg-primary text-white hover:bg-primary/90 hover:text-white",
                        )}
                      >
                        {label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Type Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full border-2 border-border font-bold h-12 px-6 gap-2 min-w-[160px] justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <BookIcon className="h-4 w-4 text-chart-2" />
                      {typeLabels[activeType] || activeType}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 border-2 border-border min-w-[180px]">
                  {Object.entries(typeLabels).map(([id, label]) => (
                    <DropdownMenuItem
                      key={id}
                      asChild
                      className="rounded-xl font-bold cursor-pointer"
                    >
                      <a
                        href={createFilterUrl({ type: id })}
                        className={cn(
                          activeType === id &&
                            "bg-chart-2 text-white hover:bg-chart-2/90 hover:text-white",
                        )}
                      >
                        {label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Active Filters Summary / Clear All */}
              {(activeFilter !== "all" ||
                activeType !== "all" ||
                searchQuery) && (
                <Button
                  variant="ghost"
                  className="rounded-full font-bold text-destructive hover:bg-destructive/10 gap-2"
                  asChild
                >
                  <a href="/shop">
                    <X className="h-4 w-4" />
                    Clear All
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => {
              const isInCart = items.some((item) => item.id === book.id);

              return (
                <div
                  key={book.id}
                  className="group bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_0_0_var(--border)] hover:translate-y-[-2px] transition-all border-2 border-border"
                >
                  <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-1.5 left-1.5 flex flex-col gap-1">
                      <span className="bg-secondary text-secondary-foreground text-[7px] font-black uppercase tracking-tight px-1.5 py-0.5 rounded-full border border-white shadow-sm w-fit">
                        {book.ageGroup} Yrs
                      </span>
                      <span className="bg-chart-2 text-white text-[7px] font-black uppercase tracking-tight px-1 py-0.5 rounded-full border border-white shadow-sm w-fit">
                        {book.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5">
                    <h3 className="font-black text-[11px] leading-tight mb-0.5 line-clamp-1 group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-muted-foreground text-[9px] mb-1.5 font-bold leading-none">
                      by {book.author}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[13px] font-black text-primary">
                        ₹{book.price}
                      </span>
                      <Button
                        size="sm"
                        variant={isInCart ? "secondary" : "default"}
                        className={cn(
                          "rounded-full px-2 h-6 font-black text-[8px] transition-all active:scale-95",
                          !isInCart &&
                            "shadow-[0_1px_0_0_rgba(0,0,0,0.1)] bg-primary text-white",
                        )}
                        onClick={() => handleAddToCart(book)}
                      >
                        {isInCart ? (
                          <>
                            <Check className="h-2.5 w-2.5 mr-0.5 stroke-[4]" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-2.5 w-2.5 mr-0.5 stroke-[4]" />
                            Get It
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-2xl font-black text-muted-foreground mb-4">
                No books found for this combination!
              </p>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-2 border-border font-bold h-12 px-8 shadow-[0_4px_0_0_var(--border)]"
              >
                <a href="/shop">Clear all filters</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
