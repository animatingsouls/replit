import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  ArrowRight, 
  Star, 
  Book as BookIcon,
  Clock,
  ShieldCheck,
  Zap
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { CATEGORIES, TESTIMONIALS, heroImg } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 max-w-xl">
              <h1 className="text-4xl md:text-6xl font-heading font-black leading-tight text-foreground">
                Preloved Kids Books,{" "}
                <span className="text-accent underline decoration-primary decoration-8 decoration-wavy underline-offset-8">
                  Loved Twice
                </span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                Curated with Love at affordable prices and sustainable books for your little ones. Build a library without breaking the bank.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-md">
                <Input
                  type="text"
                  placeholder="Search for books, titles..."
                  className="rounded-full h-14 pl-12 pr-6 border-2 border-border shadow-lg font-bold text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10 px-4">
                  Find
                </Button>
              </form>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="rounded-full text-base px-8 h-14 shadow-[0_8px_0_0_hsl(0,80,40)] hover:translate-y-[-2px] hover:shadow-[0_10px_0_0_hsl(0,80,40)] active:translate-y-[4px] active:shadow-none transition-all bg-primary text-primary-foreground font-black text-xl"
                  asChild
                >
                  <a
                    href="https://chat.whatsapp.com/BeHA7geeejd1spt7nyv0cB"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join our WhatsApp Group <ArrowRight className="ml-4 h-6 w-6" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-accent rounded-[3rem] transform rotate-6 scale-105 -z-10" />
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl aspect-[4/3]">
                <img
                  src={heroImg}
                  alt="Happy children reading books"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Age Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">Shop by Age</h2>
            <p className="text-muted-foreground text-lg font-bold">
              Find the perfect book for every stage
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link key={cat.id} href={cat.path}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-border shadow-[0_8px_0_0_var(--border)] group-hover:translate-y-[-4px] transition-all">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-6 text-center px-4">
                    <h3 className="text-xl font-black">{cat.title}</h3>
                    <p className="text-muted-foreground text-sm font-bold leading-tight">{cat.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Type Carousel */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Shop by Type</h2>
            <p className="text-muted-foreground font-bold text-lg">Explore our diverse collection</p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {[
                { id: 'Board Book', label: 'Board Books', color: 'bg-[#FFEBEE]', borderColor: 'border-[#FFCDD2]', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&h=150&auto=format&fit=crop' },
                { id: 'Paperback', label: 'Paperbacks', color: 'bg-[#E3F2FD]', borderColor: 'border-[#BBDEFB]', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=200&h=150&auto=format&fit=crop' },
                { id: 'Hardcover', label: 'Hardcovers', color: 'bg-[#F1F8E9]', borderColor: 'border-[#DCEDC8]', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=200&h=150&auto=format&fit=crop' },
                { id: 'Disney Marvel', label: 'Disney Marvel', color: 'bg-[#FFF3E0]', borderColor: 'border-[#FFE0B2]', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?q=80&w=200&h=150&auto=format&fit=crop' },
                { id: 'General Knowledge', label: 'GK Books', color: 'bg-[#F3E5F5]', borderColor: 'border-[#E1BEE7]', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=200&h=150&auto=format&fit=crop' },
                { id: 'Phonics', label: 'Phonics', color: 'bg-[#E0F7FA]', borderColor: 'border-[#B2EBF2]', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&h=150&auto=format&fit=crop' },
                { id: 'Activity Book', label: 'Activity', color: 'bg-[#FFFDE7]', borderColor: 'border-[#FFF9C4]', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=200&h=150&auto=format&fit=crop' },
                { id: 'below-50', label: 'Below 50Rs', color: 'bg-[#EFEBE9]', borderColor: 'border-[#D7CCC8]', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=200&h=150&auto=format&fit=crop' },
              ].map((type, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4">
                  <Link href={`/shop?type=${type.id}`}>
                    <div className={cn(
                      "rounded-[2rem] border-4 shadow-[0_8px_0_0_rgba(0,0,0,0.1)] hover:translate-y-[-4px] transition-all text-center h-full flex flex-col items-center cursor-pointer min-h-[220px] overflow-hidden",
                      type.color,
                      type.borderColor
                    )}>
                      <div className="w-full h-32 bg-white/50 relative overflow-hidden">
                        <img 
                          src={type.image}
                          alt={type.label}
                          className="w-full h-full object-cover mix-blend-multiply opacity-80"
                        />
                      </div>
                      <div className="p-4 flex flex-col items-center justify-center flex-grow">
                        <h3 className="font-black text-lg leading-tight">{type.label}</h3>
                        <ArrowRight className="mt-2 h-5 w-5 opacity-60" />
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-12">
            What Parents Say
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t) => (
                <CarouselItem key={t.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card
                    className="border-none shadow-sm bg-background/60 backdrop-blur-sm rounded-[2rem] h-full"
                  >
                    <CardContent className="p-8 h-full flex flex-col">
                      <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="text-lg mb-6 leading-relaxed font-bold flex-grow">"{t.text}"</p>
                      <div>
                        <p className="font-black">{t.name}</p>
                        <p className="text-sm text-muted-foreground font-bold">
                          {t.location}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl bg-primary rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">
              Join the Reading Revolution
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto font-bold">
              Get notified about new book drops, reading tips, and exclusive
              offers directly on WhatsApp.
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 h-14 text-lg font-black shadow-xl hover:scale-105 transition-all bg-white text-primary hover:bg-white/90"
              asChild
            >
              <a href="https://chat.whatsapp.com/BeHA7geeejd1spt7nyv0cB" target="_blank" rel="noopener noreferrer">
                Join our WhatsApp Group
              </a>
            </Button>
          </div>

          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
      </section>
    </Layout>
  );
}
