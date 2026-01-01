import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKS, BOOK_TYPES } from "@/lib/data";
import { useLocation } from "wouter";
import { ShoppingCart, Check, User, Book as BookIcon, ChevronDown, Filter, X } from "lucide-react";
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
  const activeAuthor = searchParams.get("author") || "all";
  const activeType = searchParams.get("type") || "all";
  
  const { addItem, items } = useCart();

  // Get unique authors
  const authors = ["all", ...new Set(BOOKS.map(book => book.author))];

  const filteredBooks = BOOKS.filter(book => {
    const ageMatch = activeFilter === "all" || book.ageGroup === activeFilter;
    const authorMatch = activeAuthor === "all" || book.author === activeAuthor;
    const typeMatch = activeType === "all" || book.type === activeType;
    return ageMatch && authorMatch && typeMatch;
  });

  const handleAddToCart = (book: any) => {
    addItem(book);
    toast.success(`${book.title} added to bag!`, {
      description: "You can DM all books together once you're done.",
      position: "bottom-center"
    });
  };

  const createFilterUrl = (params: { age?: string, author?: string, type?: string }) => {
    const newParams = new URLSearchParams(searchParams);
    if (params.age) {
      if (params.age === 'all') newParams.delete('age');
      else newParams.set('age', params.age);
    }
    if (params.author) {
      if (params.author === 'all') newParams.delete('author');
      else newParams.set('author', params.author);
    }
    if (params.type) {
      if (params.type === 'all') newParams.delete('type');
      else newParams.set('type', params.type);
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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="w-full md:w-auto">
              <h1 className="text-4xl font-black mb-2">Browse Books</h1>
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
                      {activeType === 'all' ? 'All Types' : activeType}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 border-2 border-border min-w-[180px]">
                  {BOOK_TYPES.map(type => (
                    <DropdownMenuItem key={type} asChild className="rounded-xl font-bold cursor-pointer">
                      <a href={createFilterUrl({ type })} className={cn(activeType === type && "bg-chart-2 text-white hover:bg-chart-2/90 hover:text-white")}>
                        {type === 'all' ? 'All Types' : type}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Author Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="rounded-full border-2 border-border font-bold h-12 px-6 gap-2 min-w-[160px] justify-between">
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4 text-accent" />
                      {activeAuthor === 'all' ? 'All Authors' : activeAuthor}
                    </span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="rounded-2xl p-2 border-2 border-border max-h-[300px] overflow-y-auto min-w-[200px]">
                  {authors.map(author => (
                    <DropdownMenuItem key={author} asChild className="rounded-xl font-bold cursor-pointer">
                      <a href={createFilterUrl({ author })} className={cn(activeAuthor === author && "bg-accent text-white hover:bg-accent/90 hover:text-white")}>
                        {author === 'all' ? 'All Authors' : author}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Active Filters Summary / Clear All */}
              {(activeFilter !== 'all' || activeAuthor !== 'all' || activeType !== 'all') && (
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => {
              const isInCart = items.some(item => item.id === book.id);
              
              return (
                <div key={book.id} className="group bg-white rounded-[3rem] overflow-hidden shadow-[0_12px_0_0_var(--border)] hover:translate-y-[-8px] transition-all border-4 border-border">
                  <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="bg-secondary text-secondary-foreground text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border-2 border-white shadow-lg w-fit">
                        {book.ageGroup} Yrs
                      </span>
                      <span className="bg-chart-2 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border-2 border-white shadow-lg w-fit">
                        {book.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border-2 border-white shadow-lg ${
                        book.condition === 'Like New' ? 'bg-accent text-white' :
                        book.condition === 'Good' ? 'bg-secondary text-secondary-foreground' :
                        'bg-primary text-white'
                      }`}>
                        {book.condition}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="font-black text-2xl mb-2 line-clamp-1 group-hover:text-primary transition-colors">{book.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 font-bold">by {book.author}</p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-3xl font-black text-primary">₹{book.price}</span>
                      <Button 
                        size="lg" 
                        variant={isInCart ? "secondary" : "default"}
                        className={cn(
                          "rounded-full px-6 h-12 font-black text-lg transition-all active:scale-90",
                          !isInCart && "shadow-[0_4px_0_0_rgba(0,0,0,0.15)] bg-primary text-white hover:bg-primary/90"
                        )}
                        onClick={() => handleAddToCart(book)}
                      >
                        {isInCart ? (
                          <>
                            <Check className="h-5 w-5 mr-2 stroke-[3]" />
                            Added!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-5 w-5 mr-2 stroke-[3]" />
                            Get It!
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
