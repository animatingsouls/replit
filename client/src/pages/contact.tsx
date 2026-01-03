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
              <div className="bg-white p-8 rounded-[3rem] border-4 border-border shadow-[0_12px_0_0_var(--border)]">
                <h3 className="text-2xl font-black mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Us</p>
                      <p className="font-bold text-lg">animatingsoulsbooks@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-chart-2/10 rounded-2xl flex items-center justify-center text-chart-2">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Call / WhatsApp</p>
                      <p className="font-bold text-lg">+91 99160 63646</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Location</p>
                      <p className="font-bold text-lg">Bangalore, India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t space-y-4">
                  <p className="font-black">Follow our story</p>
                  <div className="flex gap-4">
                    <Button variant="outline" size="icon" className="rounded-2xl border-2 h-12 w-12 hover:bg-primary hover:text-white transition-all">
                      <Instagram className="h-6 w-6" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-2xl border-2 h-12 w-12 hover:bg-chart-2 hover:text-white transition-all">
                      <MessageCircle className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <form className="bg-white p-8 rounded-[3rem] border-4 border-border shadow-[0_12px_0_0_var(--border)] space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest ml-1">Your Name</label>
                  <Input placeholder="Enter your name" className="h-14 rounded-2xl border-2 font-bold" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest ml-1">Email Address</label>
                  <Input type="email" placeholder="Enter your email" className="h-14 rounded-2xl border-2 font-bold" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black uppercase tracking-widest ml-1">Message</label>
                  <Textarea placeholder="How can we help you?" className="min-h-[150px] rounded-2xl border-2 font-bold p-4" />
                </div>

                <Button className="w-full h-14 rounded-full text-lg font-black shadow-[0_6px_0_0_rgba(0,0,0,0.1)] active:translate-y-1 active:shadow-none transition-all">
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
