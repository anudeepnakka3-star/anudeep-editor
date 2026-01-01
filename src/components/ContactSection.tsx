import { useState } from "react";
import { Mail, Instagram, Linkedin, Copy, Check, Calendar } from "lucide-react";
import { StaggeredItem, StaggeredText } from "@/components/StaggeredAnimation";

const openExternalInNewTab = (url: string) => {
  try {
    (window.top ?? window).open(url, "_blank", "noopener,noreferrer");
  } catch {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("anudeepnetha3@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = "anudeepnetha3@gmail.com";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const socialIcons = [
    {
      href: "https://www.linkedin.com/in/nakka-anudeep-93698033b",
      icon: <Linkedin className="w-5 h-5" />,
      external: true,
    },
    {
      href: "https://www.instagram.com/_anudeeeep1",
      icon: <Instagram className="w-5 h-5" />,
      external: true,
    },
    {
      href: "mailto:anudeepnetha3@gmail.com",
      icon: <Mail className="w-5 h-5" />,
      external: false,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden noise-texture">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-8 md:space-y-12">
          
          {/* Social Icons Row */}
          <div className="flex justify-center gap-4">
            {socialIcons.map((social, index) => (
              <StaggeredItem key={index} index={index} staggerDelay={100}>
                <a
                  href={social.href}
                  target={social.external ? "_blank" : undefined}
                  rel={social.external ? "noopener noreferrer" : undefined}
                  onClick={social.external ? (e) => {
                    e.preventDefault();
                    openExternalInNewTab(social.href);
                  } : undefined}
                  className="glass-icon w-12 h-12 text-muted-foreground hover:text-foreground"
                >
                  {social.icon}
                </a>
              </StaggeredItem>
            ))}
          </div>

          {/* Email Display */}
          <StaggeredText delay={300}>
            <div className="flex justify-center">
              <a
                href="mailto:anudeepnetha3@gmail.com"
                className="glass-button group flex items-center gap-3 px-6 py-3"
              >
                <Mail className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-foreground font-medium">anudeepnetha3@gmail.com</span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    copyEmail();
                  }}
                  className="glass-icon w-8 h-8 ml-1 text-muted-foreground hover:text-foreground"
                  title="Copy email"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </a>
            </div>
          </StaggeredText>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <StaggeredItem index={0} baseDelay={400} staggerDelay={100}>
              <a
                href="https://wa.me/918247379992"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openExternalInNewTab("https://wa.me/918247379992");
                }}
                className="glass-button flex items-center justify-center gap-3 px-8 py-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="font-medium">WhatsApp</span>
              </a>
            </StaggeredItem>
            <StaggeredItem index={1} baseDelay={400} staggerDelay={100}>
              <a
                href="https://calendly.com/anudeepnetha3"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openExternalInNewTab("https://calendly.com/anudeepnetha3");
                }}
                className="glass-button flex items-center justify-center gap-3 px-8 py-3"
              >
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Book a Call</span>
              </a>
            </StaggeredItem>
          </div>

          {/* Note Text */}
          <StaggeredText delay={600}>
            <p className="text-sm text-muted-foreground/70 max-w-md mx-auto">
              Note: Please contact only through WhatsApp, email, or by booking a call, but not through direct calls.
            </p>
          </StaggeredText>
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
