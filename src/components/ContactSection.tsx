import { Button } from "@/components/ui/button";
import { Mail, Instagram, Youtube, ArrowRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      
      {/* Decorative lines */}
      <div className="absolute bottom-0 left-1/4 web-line h-48" />
      <div className="absolute bottom-0 right-1/3 web-line h-64" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-medium tracking-widest uppercase mb-4">Get in Touch</p>
          
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6">
            Let's create something<br />
            <span className="text-gradient">unforgettable.</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-12">
            Have a project in mind? Let's talk about how we can bring your vision to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button variant="hero" size="xl" className="group">
              <Mail className="w-5 h-5" />
              Let's Work Together
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a 
              href="#" 
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 py-6 border-t border-border/30">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 <span className="text-foreground">Anudeep</span>. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with precision & passion
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
