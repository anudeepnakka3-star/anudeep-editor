import { Button } from "@/components/ui/button";
import { Mail, Instagram, Linkedin, ArrowRight } from "lucide-react";

const openExternalInNewTab = (url: string) => {
  try {
    // Prefer top window so links don't attempt to load inside sandboxed iframes.
    (window.top ?? window).open(url, "_blank", "noopener,noreferrer");
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

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
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="mailto:anudeepnetha3@gmail.com">
                <Mail className="w-5 h-5" />
                Let's Work Together
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://www.instagram.com/_anudeeeep1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openExternalInNewTab("https://www.instagram.com/_anudeeeep1");
              }}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/nakka-anudeep-93698033b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/918247379992"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openExternalInNewTab("https://wa.me/918247379992");
              }}
              className="w-12 h-12 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a
              href="mailto:anudeepnetha3@gmail.com?subject=&body="
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
          <p className="text-sm text-muted-foreground">Crafted with precision & passion</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
