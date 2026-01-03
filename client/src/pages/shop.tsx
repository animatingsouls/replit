import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKS } from "@/lib/data";
import { useLocation } from "wouter";
import { ShoppingCart, Check, Book as BookIcon, ChevronDown, Filter, X } from "lucide-react";
import { useCart } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Shop() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const activeFilter = searchParams.get("age") || "all";
  const activeType = searchParams.get("type") || "all";
  const searchQuery = searchParams.get("search") || "";
  
  const { addItem, items } = useCart();

  const filteredBooks = BOOKS.filter(book => {
    const ageMatch = activeFilter === "all" || book.ageGroup === activeFilter;
    
    // Type and Price Filter Logic
    let typeMatch = true;
    if (activeType === "below-50") {
      typeMatch = book.price < 50;
    } else if (activeType !== "all") {
      typeMatch = book.type === activeType;
    }

    // Search query logic
    const searchMatch = !searchQuery || 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return ageMatch && typeMatch && searchMatch;
  });

  const handleAddToCart = (book: any) => {
    addItem(book);
    toast.success(`${book.title} added to bag!`, {
      description: "You can DM all books together once you're done.",
      position: "bottom-center"
    });
  };

  const createFilterUrl = (params: { age?: string, type?: string, search?: string }) => {
    const newParams = new URLSearchParams(searchParams);
    if (params.age) {
      if (params.age === 'all') newParams.delete('age');
      else newParams.set('age', params.age);
    }
    if (params.type) {
      if (params.type === 'all') newParams.delete('type');
      else newParams.set('type', params.type);
    }
    if (params.search !== undefined) {
      if (!params.search) newParams.delete('search');
      else newParams.set('search', params.search);
    }
    return `/shop?${newParams.toString()}`;
  };

  const ageLabels: Record<string, string> = {
    'all': 'All Ages',
    '0-3': '0-3 Yrs',
    '3-6': '3-6 Yrs',
    '6-8': '6-8 Yrs',
    '8-12': '8-12 Yrs'
  };

  const typeLabels: Record<string, string> = {
    'all': 'All Types',
    'Board Book': 'Boards',
    'Paperback': 'Paperbacks',
    'Hardcover': 'Hardcovers',
    'Disney Marvel': 'Disney Marvel',
    'General Knowledge': 'General Knowledge',
    'Phonics': 'Phonics',
    'Activity Book': 'Activity',
    'Collection of Stories': 'Collection of Stories',
    'below-50': 'Books below 50Rs'
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="w-full md:w-auto">
              <h1 className="text-4xl font-black mb-2">
                {searchQuery ? `Search: "${searchQuery}"` : "Shop Now"}
              </h1>
              <p className="text-muted-foreground font-bold">Found {filteredBooks.length} treasures</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              {/* Age Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full border-2 border-border font-bold h-12 px-6 gap-2 min-w-[140px] justify-between">
                    <span className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-primary" />
                      {ageLabels[activeFilter]}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 border-2 border-border min-w-[180px]">
                  {Object.entries(ageLabels).map(([id, label]) => (
                    <DropdownMenuItem key={id} asChild className="rounded-xl font-bold cursor-pointer">
                      <a href={createFilterUrl({ age: id })} className={cn(activeFilter === id && "bg-primary text-white hover:bg-primary/90 hover:text-white")}>
                        {label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Type Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full border-2 border-border font-bold h-12 px-6 gap-2 min-w-[160px] justify-between">
                    <span className="flex items-center gap-2">
                      <BookIcon className="h-4 w-4 text-chart-2" />
                      {typeLabels[activeType] || activeType}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 border-2 border-border min-w-[180px]">
                  {Object.entries(typeLabels).map(([id, label]) => (
                    <DropdownMenuItem key={id} asChild className="rounded-xl font-bold cursor-pointer">
                      <a href={createFilterUrl({ type: id })} className={cn(activeType === id && "bg-chart-2 text-white hover:bg-chart-2/90 hover:text-white")}>
                        {label}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Active Filters Summary / Clear All */}
              {(activeFilter !== 'all' || activeType !== 'all' || searchQuery) && (
                <Button variant="ghost" className="rounded-full font-bold text-destructive hover:bg-destructive/10 gap-2" asChild>
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
              const isInCart = items.some(item => item.id === book.id);
              
              return (
                <div key={book.id} className="group bg-white rounded-[1.5rem] overflow-hidden shadow-[0_4px_0_0_var(--border)] hover:translate-y-[-2px] transition-all border-2 border-border">
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
                    <h3 className="font-black text-[11px] leading-tight mb-0.5 line-clamp-1 group-hover:text-primary transition-colors">{book.title}</h3>
                    <p className="text-muted-foreground text-[9px] mb-1.5 font-bold leading-none">by {book.author}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-[13px] font-black text-primary">₹{book.price}</span>
                      <Button 
                        size="sm" 
                        variant={isInCart ? "secondary" : "default"}
                        className={cn(
                          "rounded-full px-2 h-6 font-black text-[8px] transition-all active:scale-95",
                          !isInCart && "shadow-[0_1px_0_0_rgba(0,0,0,0.1)] bg-primary text-white"
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
              <p className="text-2xl font-black text-muted-foreground mb-4">No books found for this combination!</p>
              <Button asChild variant="outline" className="rounded-full border-2 border-border font-bold h-12 px-8 shadow-[0_4px_0_0_var(--border)]">
                <a href="/shop">Clear all filters</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
