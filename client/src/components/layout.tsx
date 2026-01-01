import { Link, useLocation } from "wouter";
import { Menu, X, ShoppingBag, Heart, BookOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Browse Books" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "Our Story" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 font-heading font-bold text-xl text-primary hover:opacity-80 transition-opacity">
            <BookOpen className="h-6 w-6" />
            <span>Little Readers</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location === link.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <Button asChild size="sm" className="rounded-full px-6">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      location === link.href
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
              <Button asChild className="w-full mt-4 rounded-full" size="lg">
                <Link href="/shop" onClick={() => setIsOpen(false)}>Shop Now</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary/30 pt-16 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-primary flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Little Readers
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Giving preloved children's books a second home. Building a community of conscious parents and happy little readers.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop?age=0-3"><a className="hover:text-primary">0-3 Years</a></Link></li>
              <li><Link href="/shop?age=3-6"><a className="hover:text-primary">3-6 Years</a></Link></li>
              <li><Link href="/shop?age=6-10"><a className="hover:text-primary">6-10 Years</a></Link></li>
              <li><Link href="/shop"><a className="hover:text-primary">All Books</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about"><a className="hover:text-primary">Our Story</a></Link></li>
              <li><Link href="/how-it-works"><a className="hover:text-primary">How It Works</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-primary">Contact Us</a></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Connect</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Join our WhatsApp community for daily book drops!
            </p>
            <Button variant="outline" className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white">
              Join WhatsApp Group
            </Button>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Little Readers India. All rights reserved.</p>
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
