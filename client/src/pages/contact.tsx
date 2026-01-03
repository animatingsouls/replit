import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black mb-4">Get in Touch</h1>
            <p className="text-muted-foreground text-xl font-bold">
              Have questions about a book? We're here to help!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="bg-white p-6 rounded-[2.5rem] border-4 border-border shadow-[0_8px_0_0_var(--border)] max-w-sm mx-auto md:mx-0">
                <h3 className="text-xl font-black mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">Email</p>
                      <p className="font-bold text-sm truncate">animatingsoulsbooks@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-chart-2/10 rounded-xl flex items-center justify-center text-chart-2 shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">WhatsApp</p>
                      <p className="font-bold text-sm">+91 99160 63646</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none mb-1">Location</p>
                      <p className="font-bold text-sm">Bangalore, India</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const message = formData.get('message');
                  const whatsappUrl = `https://wa.me/919916063646?text=${encodeURIComponent(`Hi, I'm ${name}. ${message}`)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="bg-white p-8 rounded-[3rem] border-4 border-border shadow-[0_12px_0_0_var(--border)] space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest ml-1">Your Name</label>
                  <Input name="name" placeholder="Enter your name" className="h-14 rounded-2xl border-2 font-bold" required />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest ml-1">Email Address</label>
                  <Input type="email" name="email" placeholder="Enter your email" className="h-14 rounded-2xl border-2 font-bold" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest ml-1">Message</label>
                  <Textarea name="message" placeholder="How can we help you?" className="min-h-[150px] rounded-2xl border-2 font-bold p-4" required />
                </div>

                <Button type="submit" className="w-full h-14 rounded-full text-lg font-black shadow-[0_6px_0_0_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none transition-all">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
