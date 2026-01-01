import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKS, BOOK_TYPES } from "@/lib/data";
import { useLocation } from "wouter";
import { ShoppingCart, Check, User, Book as BookIcon } from "lucide-react";
import { useCart } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="w-full md:w-auto">
              <h1 className="text-4xl font-black mb-2">Browse Books</h1>
              <p className="text-muted-foreground font-bold">Found {filteredBooks.length} treasures</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
              {/* Age Filter */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">Filter by Age</span>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {[
                    { id: 'all', label: 'All Ages' },
                    { id: '0-3', label: '0-3 Yrs' },
                    { id: '3-6', label: '3-6 Yrs' },
                    { id: '6-8', label: '6-8 Yrs' },
                    { id: '8-12', label: '8-12 Yrs' }
                  ].map(filter => (
                    <Button
                      key={filter.id}
                      variant={activeFilter === filter.id ? "default" : "outline"}
                      className={cn(
                        "rounded-full whitespace-nowrap border-2",
                        activeFilter === filter.id ? "shadow-md bg-primary border-primary text-white" : "border-border hover:bg-muted"
                      )}
                      asChild
                    >
                      <a href={createFilterUrl({ age: filter.id })}>
                        {filter.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
                  <BookIcon className="h-3 w-3" /> Filter by Type
                </span>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {BOOK_TYPES.map(type => (
                    <Button
                      key={type}
                      variant={activeType === type ? "default" : "outline"}
                      className={cn(
                        "rounded-full whitespace-nowrap border-2 px-4 h-10 font-bold",
                        activeType === type ? "bg-chart-2 border-chart-2 text-white shadow-md" : "border-border hover:bg-muted"
                      )}
                      asChild
                    >
                      <a href={createFilterUrl({ type })}>
                        {type === 'all' ? 'All Types' : type}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Author Filter Section */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1 flex items-center gap-2">
              <User className="h-3 w-3" /> Filter by Author
            </span>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {authors.map(author => (
                <Button
                  key={author}
                  variant={activeAuthor === author ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-full whitespace-nowrap border-2 px-4 h-9 font-bold",
                    activeAuthor === author ? "bg-accent border-accent text-white shadow-md" : "border-border hover:bg-muted"
                  )}
                  asChild
                >
                  <a href={createFilterUrl({ author })}>
                    {author === 'all' ? 'All Authors' : author}
                  </a>
                </Button>
              ))}
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
              <Button asChild variant="outline" className="rounded-full border-2">
                <a href="/shop">Clear all filters</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}