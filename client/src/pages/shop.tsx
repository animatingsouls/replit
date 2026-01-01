import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKS } from "@/lib/data";
import { useLocation } from "wouter";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Shop() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const activeFilter = searchParams.get("age") || "all";
  
  const { addItem, items } = useCart();

  const filteredBooks = activeFilter === "all" 
    ? BOOKS 
    : BOOKS.filter(book => book.ageGroup === activeFilter);

  const handleAddToCart = (book: any) => {
    addItem(book);
    toast.success(`${book.title} added to bag!`, {
      description: "You can DM all books together once you're done.",
      position: "bottom-center"
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Browse Books</h1>
            <p className="text-muted-foreground">Found {filteredBooks.length} treasures</p>
          </div>
          
          {/* Simple Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Ages' },
              { id: '0-3', label: '0-3 Years' },
              { id: '3-6', label: '3-6 Years' },
              { id: '6-10', label: '6-10 Years' }
            ].map(filter => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`rounded-full whitespace-nowrap ${activeFilter === filter.id ? "shadow-md" : "border-primary/20"}`}
                asChild
              >
                <a href={filter.id === 'all' ? '/shop' : `/shop?age=${filter.id}`}>
                  {filter.label}
                </a>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => {
            const isInCart = items.some(item => item.id === book.id);
            
            return (
              <div key={book.id} className="group bg-white rounded-[3rem] overflow-hidden shadow-[0_12px_0_0_var(--border)] hover:translate-y-[-8px] transition-all border-4 border-border">
                <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-secondary-foreground text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border-2 border-white shadow-lg">
                      {book.ageGroup} Yrs
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
          })}
        </div>
      </div>
    </Layout>
  );
}
