import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const locations = [
  {
    city: "New York",
    address: "680 Madison Avenue, New York, NY 10065",
    phone: "+1 212 555 0123",
    hours: "Mon–Sat 10:00–19:00"
  },
  {
    city: "London",
    address: "27 New Bond Street, London W1S 2RR",
    phone: "+44 20 7123 4567",
    hours: "Mon–Sat 10:00–18:00"
  },
  {
    city: "Mumbai",
    address: "Palladium Mall, Lower Parel, Mumbai 400013",
    phone: "+91 22 4567 8901",
    hours: "Daily 11:00–21:00"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Message sent successfully", {
      description: "Our team will respond within 24 hours."
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      <SEOHead
        title="Contact Us | AMARISÉ"
        description="Get in touch with our client advisors. We're here to assist with orders, appointments, and personalized recommendations."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="container-editorial text-center">
          <motion.p
            {...fadeInUp}
            className="text-caption text-muted-foreground mb-6"
          >
            WE'RE HERE FOR YOU
          </motion.p>
          <motion.h1
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl max-w-3xl mx-auto leading-tight"
          >
            Let's Connect
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            Our dedicated advisors are available to assist with orders, 
            personalized recommendations, and exclusive services.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-muted/30">
        <div className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-2xl md:text-3xl mb-8">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="bg-background border-border/50 focus:border-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="bg-background border-border/50 focus:border-foreground"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 234 567 890"
                      className="bg-background border-border/50 focus:border-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData({ ...formData, subject: value })}
                    >
                      <SelectTrigger className="bg-background border-border/50">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="order">Order Inquiry</SelectItem>
                        <SelectItem value="product">Product Information</SelectItem>
                        <SelectItem value="appointment">Private Appointment</SelectItem>
                        <SelectItem value="press">Press & Media</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we assist you?"
                    rows={6}
                    required
                    className="bg-background border-border/50 focus:border-foreground resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-12 py-6 text-sm tracking-widest"
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <div>
                <h2 className="font-serif text-2xl md:text-3xl mb-8">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:concierge@amarise.com" className="text-muted-foreground hover:text-foreground transition-colors">
                        concierge@amarise.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium">International</p>
                      <a href="tel:+18005550123" className="text-muted-foreground hover:text-foreground transition-colors">
                        +1 800 555 0123
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Response Time</p>
                      <p className="text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <h3 className="font-serif text-xl mb-6">Our Boutiques</h3>
                <div className="space-y-8">
                  {locations.map((location) => (
                    <div key={location.city} className="group">
                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{location.city}</p>
                          <p className="text-muted-foreground text-sm">{location.address}</p>
                          <p className="text-muted-foreground text-sm">{location.phone}</p>
                          <p className="text-muted-foreground text-sm">{location.hours}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Private Appointment CTA */}
      <section className="py-24 bg-foreground text-primary-foreground">
        <div className="container-editorial text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-caption text-primary-foreground/60 mb-4">EXCLUSIVE EXPERIENCE</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">Private Consultations</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Schedule a one-on-one session with our personal stylists for 
              curated recommendations and bespoke services.
            </p>
            <Button
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
            >
              BOOK AN APPOINTMENT
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
