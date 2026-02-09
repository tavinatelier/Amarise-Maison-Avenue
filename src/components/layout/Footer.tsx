import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const shopLinks = [
  { name: "Beauty", path: "/beauty" },
  { name: "Atelier", path: "/atelier" },
  { name: "Lifestyle", path: "/lifestyle" },
];

const discoverLinks = [
  { name: "Journal", path: "/journal" },
  { name: "About AMARISÉ", path: "/about-amarise" },
  { name: "Sustainability", path: "/values-sustainability" },
];

const customerLinks = [
  { name: "Contact Us", path: "#" },
  { name: "Shipping & Returns", path: "#" },
  { name: "Size Guide", path: "#" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-divider">
      <div className="container-editorial section-luxury-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link
              to="/"
              className="font-serif text-xl tracking-widest hover:opacity-70 transition-opacity duration-300"
            >
              AMARISÉ
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A global luxury beauty, fashion, and lifestyle brand. Where beauty
              meets intention, and every detail whispers refinement.
            </p>
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-6">
            <h4 className="text-caption">Shop</h4>
            <nav className="flex flex-col gap-3">
              {shopLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Discover */}
          <div className="space-y-6">
            <h4 className="text-caption">Discover</h4>
            <nav className="flex flex-col gap-3">
              {discoverLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Customer Care */}
          <div className="space-y-6">
            <h4 className="text-caption">Customer Care</h4>
            <nav className="flex flex-col gap-3">
              {customerLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <p className="text-sm text-muted-foreground">
              contact@amarise.com
            </p>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-divider">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="font-serif text-lg mb-2">Join the Ritual</h4>
              <p className="text-sm text-muted-foreground">
                Receive updates on new arrivals, exclusive events, and stories from our world.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-transparent border border-border/50 text-sm focus:outline-none focus:border-foreground/50 transition-colors"
              />
              <button className="px-6 py-3 bg-foreground text-background text-sm tracking-widest uppercase hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-divider flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AMARISÉ. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/values-sustainability"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Sustainability
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-muted-foreground/30">|</span>
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
