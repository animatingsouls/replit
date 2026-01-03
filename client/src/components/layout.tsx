import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingBag, Heart, BookOpen, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/store";
import logoImg from "@assets/Books_Logo_1767266123321.png";

export function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items, removeItem, totalPrice, totalItems, generateWhatsAppMessage } = useCart();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
            <img src={logoImg} alt="Animating Souls Books" className="h-20 w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary cursor-pointer",
                  location === link.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </span>
            </Link>
          ))}
          
          <Sheet>
            <SheetTrigger asChild>
              <div className="relative group cursor-pointer p-2 rounded-full hover:bg-secondary transition-colors">
                <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                {totalItems() > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {totalItems()}
                  </span>
                )}
              </div>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl flex items-center gap-2">
                  <ShoppingCart className="h-6 w-6" />
                  Your Book Bag
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex-grow overflow-y-auto py-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">Your bag is empty!</p>
                    <Link href="/shop">
                      <span className="mt-2 text-primary cursor-pointer hover:underline block">Go find some treasures</span>
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-secondary/30 rounded-2xl border border-border/50">
                      <img src={item.image} className="w-20 h-24 object-cover rounded-xl shadow-sm" alt={item.title} />
                      <div className="flex-grow">
                        <h4 className="font-bold line-clamp-1">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{item.author}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">₹{item.price}</span>
                          <Button variant="ghost" size="sm" className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => removeItem(item.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <SheetFooter className="border-t pt-6 block space-y-4">
                  <div className="flex items-center justify-between text-xl font-bold">
                    <span>Total Order</span>
                    <span className="text-primary">₹{totalPrice()}</span>
                  </div>
                  <p className="text-xs text-center text-primary font-bold italic">
                    *Shipping charges are extra
                  </p>
                  <Button className="w-full h-14 rounded-full text-lg font-bold shadow-lg" asChild>
                    <a href={`https://wa.me/919916063646?text=${generateWhatsAppMessage()}`} target="_blank" rel="noopener noreferrer">
                      Place Order on WhatsApp
                    </a>
                  </Button>
                  <p className="text-[10px] text-center text-muted-foreground">
                    Items are blocked only after payment. Ordering on WhatsApp starts the process!
                  </p>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>

          <Link href="/shop">
            <Button size="sm" className="rounded-full px-6 shadow-md cursor-pointer">
              Shop Now
            </Button>
          </Link>
        </div>

        {/* Mobile Nav Button */}
        <div className="flex items-center gap-2 md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {totalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-in zoom-in">
                    {totalItems()}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">Your Book Bag</SheetTitle>
              </SheetHeader>
              <div className="flex-grow overflow-y-auto py-6 space-y-4">
                {items.length === 0 ? (
                  <p className="text-center text-muted-foreground py-12">Bag is empty!</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-secondary/30 rounded-2xl border border-border/50">
                      <img src={item.image} className="w-16 h-20 object-cover rounded-xl" alt={item.title} />
                      <div className="flex-grow">
                        <h4 className="font-bold text-sm line-clamp-1">{item.title}</h4>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-primary">₹{item.price}</span>
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-destructive" onClick={() => removeItem(item.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {items.length > 0 && (
                <SheetFooter className="border-t pt-4">
                  <Button className="w-full rounded-full h-12" asChild>
                    <a href={`https://wa.me/919916063646?text=${generateWhatsAppMessage()}`} target="_blank" rel="noopener noreferrer">
                      Order (₹{totalPrice()})
                    </a>
                  </Button>
                </SheetFooter>
              )}
            </SheetContent>
          </Sheet>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary cursor-pointer",
                        location === link.href
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                <Link href="/shop">
                  <Button className="w-full mt-4 rounded-full shadow-lg cursor-pointer" size="lg" onClick={() => setIsMenuOpen(false)}>
                    Shop Now
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary/30 pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
              Animating Souls Books
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-bold">
              Giving preloved children's books a second home. Building a community of conscious parents and happy little readers.
            </p>
          </div>

          <div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about"><span className="hover:text-primary cursor-pointer">Our Story</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-primary cursor-pointer">Contact Us</span></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Animating Souls Books India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
