import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { StaggeredText, StaggeredItem } from "@/components/StaggeredAnimation";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const firstError = result.error.errors[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert([
          {
            name: result.data.name,
            email: result.data.email,
            message: result.data.message,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Clear form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-32 relative overflow-hidden noise-texture">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 web-line h-32" />
      <div className="absolute top-0 right-1/3 web-line h-48" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <StaggeredText delay={0}>
            <h2 className="font-display text-5xl md:text-7xl text-foreground mb-4">
              Contact Form
            </h2>
          </StaggeredText>
          <StaggeredText delay={100}>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Let's Work Together
            </p>
          </StaggeredText>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <StaggeredItem index={0} staggerDelay={100} baseDelay={200}>
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="h-14 bg-card/80 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              />
            </StaggeredItem>
            
            <StaggeredItem index={1} staggerDelay={100} baseDelay={200}>
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="h-14 bg-card/80 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 transition-all duration-300"
              />
            </StaggeredItem>
            
            <StaggeredItem index={2} staggerDelay={100} baseDelay={200}>
              <Textarea
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="bg-card/80 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 resize-none"
              />
            </StaggeredItem>
            
            <StaggeredItem index={3} staggerDelay={100} baseDelay={200}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-[hsl(45,30%,85%)] hover:bg-[hsl(45,30%,75%)] text-background font-medium text-lg transition-all duration-300"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </StaggeredItem>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
