import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent-secondary flex items-center justify-center">
                <span className="text-xl font-bold text-accent-secondary-foreground">L</span>
              </div>
              <span className="text-xl font-bold">LuxeStyle</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover premium fashion and accessories with our curated collection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-accent-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-accent-secondary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent-secondary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-accent-secondary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-accent-secondary transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent-secondary hover:text-accent-secondary-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent-secondary hover:text-accent-secondary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent-secondary hover:text-accent-secondary-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-accent-secondary hover:text-accent-secondary-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} LuxeStyle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
