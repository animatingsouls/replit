import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Truck, BookOpen } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: MessageCircle,
      title: "Join & Browse",
      desc: "Join our exclusive WhatsApp group where we drop new curated collections every week. Browse the catalog directly on your phone."
    },
    {
      icon: BookOpen,
      title: "Block Your Books",
      desc: "Spot a book you love? Simply reply or DM to block it. It's fastest fingers first, as we usually have single copies!"
    },
    {
      icon: Truck,
      title: "Pay & Receive",
      desc: "Complete the payment via UPI. We ship via India Post or courier within 48 hours. Receive happiness at your doorstep!"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How to Order</h1>
          <p className="text-xl text-muted-foreground">Simple, personal, and quick.</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 text-center md:text-left">
                  <div className={`flex flex-col gap-4 ${i % 2 === 1 ? 'md:items-end md:text-right' : 'md:items-start'}`}>
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg md:hidden mx-auto">
                      {i + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-lg text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
                
                <div className="relative z-10 w-16 h-16 bg-background border-4 border-primary text-primary rounded-full hidden md:flex items-center justify-center text-2xl font-bold shadow-xl">
                  {i + 1}
                </div>

                <div className="flex-1 flex justify-center">
                  <div className="w-full max-w-xs aspect-video bg-secondary/30 rounded-2xl flex items-center justify-center text-primary/40">
                    <step.icon className="h-16 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <Button size="lg" className="rounded-full px-12 h-14 text-lg shadow-xl" asChild>
             <a href="https://wa.me/919916063646" target="_blank" rel="noopener noreferrer">
               Start Browsing Now
             </a>
          </Button>
        </div>
      </div>
    </Layout>
  );
}
