import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { BOOKS } from "@/lib/data";
import { useLocation } from "wouter";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function Shop() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const activeFilter = searchParams.get("age") || "all";

  const filteredBooks = activeFilter === "all" 
    ? BOOKS 
    : BOOKS.filter(book => book.ageGroup === activeFilter);

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
                className={`rounded-full whitespace-nowrap ${activeFilter === filter.id ? "shadow-md" : ""}`}
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
          {filteredBooks.map((book) => (
            <div key={book.id} className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-border/50">
              <div className="aspect-[3/4] bg-muted relative overflow-hidden">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {book.ageGroup} Yrs
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-sm backdrop-blur-sm ${
                    book.condition === 'Like New' ? 'bg-green-100 text-green-700' :
                    book.condition === 'Good' ? 'bg-blue-100 text-blue-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {book.condition}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{book.author}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-primary">₹{book.price}</span>
                  <Button size="sm" className="rounded-full" asChild>
                    <a href={`https://wa.me/919999999999?text=Hi! I'm interested in buying ${book.title}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      DM to Order
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
