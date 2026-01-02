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
              <Badge
                variant="secondary"
                className="px-4 py-1 text-primary bg-primary/10 hover:bg-primary/20 rounded-full border-2 border-primary/20"
              >
                🇮🇳 Aravind's Favorite Preloved Book Store
              </Badge>
              <h1 className="text-4xl md:text-6xl font-heading font-black leading-tight text-foreground">
                Preloved Children's Books,{" "}
                <span className="text-accent underline decoration-primary decoration-8 decoration-wavy underline-offset-8">
                  Loved Twice
                </span>
              </h1>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                Curated, affordable, and sustainable books for your little ones.
                Build a library without breaking the bank.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="rounded-full text-base px-8 h-14 shadow-[0_8px_0_0_hsl(0,80,40)] hover:translate-y-[-2px] hover:shadow-[0_10px_0_0_hsl(0,80,40)] active:translate-y-[4px] active:shadow-none transition-all bg-primary text-primary-foreground font-black text-xl"
                  asChild
                >
                  <a
                    href="https://wa.me/919916063646"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Browse on WhatsApp <ArrowRight className="ml-4 h-6 w-6" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full text-base px-8 h-14 border-4 border-secondary text-secondary-foreground font-black text-xl hover:bg-secondary/20"
                  asChild
                >
                  <Link href="/how-it-works">How It Works</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-accent rounded-[3rem] transform rotate-6 scale-105 -z-10" />
              <div className="absolute inset-0 bg-secondary rounded-[3rem] transform -rotate-3 scale-105 -z-20" />
              <img
                src={heroImg}
                alt="Happy child reading"
                className="rounded-[3rem] shadow-2xl w-full object-cover aspect-[4/3] transform -rotate-1 hover:rotate-0 transition-transform duration-500 border-8 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/30 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: IndianRupee,
                title: "Affordable Prices",
                desc: "High quality books at 50-70% off retail prices.",
                color: "bg-chart-3 text-white border-chart-3/50",
              },
              {
                icon: Heart,
                title: "Curated with Love",
                desc: "Hand-picked books sorted by age and interest.",
                color: "bg-primary text-white border-primary/50",
              },
              {
                icon: Leaf,
                title: "Sustainable Choice",
                desc: "Save books from landfills and teach conscious habits.",
                color: "bg-accent text-white border-accent/50",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[3rem] text-center border-4 border-black/5 shadow-[0_12px_0_0_rgba(0,0,0,0.05)] hover:translate-y-[-8px] transition-all"
              >
                <div
                  className={`w-20 h-20 ${feature.color} rounded-[2rem] flex items-center justify-center mx-auto mb-8 transform ${i % 2 === 0 ? "rotate-6" : "-rotate-6"} border-4 shadow-lg`}
                >
                  <feature.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-black mb-4">{feature.title}</h3>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                  {feature.desc}
                </p>
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
            <p className="text-muted-foreground">
              Find the perfect book for every stage
            </p>
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
          <h2 className="text-3xl font-bold text-center mb-12">
            What Parents Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <Card
                key={t.id}
                className="border-none shadow-sm bg-background/60 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-6 leading-relaxed">"{t.text}"</p>
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.location}
                    </p>
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Join the Reading Revolution
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Get notified about new book drops, reading tips, and exclusive
              offers directly on WhatsApp.
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 h-14 text-lg font-bold shadow-xl hover:scale-105 transition-all bg-white text-background hover:bg-white/90"
            >
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
