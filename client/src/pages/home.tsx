import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Heart, Leaf, IndianRupee } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { heroImg, CATEGORIES, TESTIMONIALS } from "@/lib/data";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 max-w-xl">
              <Badge variant="secondary" className="px-4 py-1 text-primary bg-primary/20 hover:bg-primary/30 rounded-full border-primary/30">
                🇮🇳 India's Favorite Preloved Book Store
              </Badge>
              <h1 className="text-4xl md:text-6xl font-heading font-bold leading-tight text-foreground">
                Preloved Children's Books, <span className="text-primary underline decoration-accent/50 decoration-wavy">Loved Twice</span>
              </h1>
              <p className="text-lg text-muted-foreground/90 leading-relaxed">
                Curated, affordable, and sustainable books for your little ones. 
                Build a library without breaking the bank.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="rounded-full text-base px-8 h-12 shadow-lg hover:shadow-primary/20 hover:translate-y-[-2px] active:translate-y-[1px] transition-all bg-primary text-primary-foreground font-bold" asChild>
                  <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
                    Browse on WhatsApp <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full text-base px-8 h-12 border-2 border-primary/50 text-primary hover:bg-primary/10" asChild>
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-[2rem] transform rotate-3 scale-105 -z-10 blur-2xl" />
              <img 
                src={heroImg} 
                alt="Happy child reading" 
                className="rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3] transform -rotate-1 hover:rotate-0 transition-transform duration-500 border-2 border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: IndianRupee, 
                title: "Affordable Prices", 
                desc: "High quality books at 50-70% off retail prices.",
                color: "bg-chart-3/30 text-chart-3"
              },
              { 
                icon: Heart, 
                title: "Curated with Love", 
                desc: "Hand-picked books sorted by age and interest.",
                color: "bg-primary/30 text-primary"
              },
              { 
                icon: Leaf, 
                title: "Sustainable Choice", 
                desc: "Save books from landfills and teach conscious habits.",
                color: "bg-chart-2/30 text-chart-2"
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/40 backdrop-blur-sm p-8 rounded-[2.5rem] text-center border border-white/5 hover:bg-card/60 transition-all"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Age</h2>
            <p className="text-muted-foreground">Find the perfect book for every stage</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.id} href={cat.path}>
                <a className="group block relative overflow-hidden rounded-3xl aspect-[3/4]">
                  <img 
                    src={cat.image} 
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{cat.title}</h3>
                    <p className="text-white/80 mb-4">{cat.description}</p>
                    <span className="inline-flex items-center text-sm font-semibold bg-white/20 backdrop-blur-md px-4 py-2 rounded-full group-hover:bg-white group-hover:text-black transition-colors">
                      Browse Books <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Parents Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <Card key={t.id} className="border-none shadow-sm bg-background/60 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-lg mb-6 leading-relaxed">"{t.text}"</p>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl bg-dark-pastel-gradient rounded-[3rem] p-8 md:p-16 text-center text-primary-foreground relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Join the Reading Revolution</h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Get notified about new book drops, reading tips, and exclusive offers directly on WhatsApp.
            </p>
            <Button size="lg" className="rounded-full px-8 h-14 text-lg font-bold shadow-xl hover:scale-105 transition-all bg-white text-background hover:bg-white/90">
              Join WhatsApp Group
            </Button>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-chart-3/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
      </section>
    </Layout>
  );
}
