'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-muted/30 to-accent-secondary/10 py-20 md:py-32">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Discover Your Style
              </h1>
              <p className="text-xl text-muted-foreground">
                Explore our curated collection of premium fashion and accessories.
                Timeless elegance meets modern design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button size="lg" className="bg-accent-secondary hover:bg-accent-secondary/90">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 md:py-24">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
                <p className="text-muted-foreground">Handpicked items from our collection</p>
              </div>
              <Link href="/products">
                <Button variant="outline" className="hidden md:flex">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-8 md:hidden text-center">
              <Link href="/products" className="w-full inline-block">
                <Button variant="outline" className="w-full">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find exactly what you're looking for</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link href="/products?category=Clothing" className="group">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-accent-secondary/20 group-hover:bg-accent-secondary/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">Clothing</h3>
                      <p className="text-muted-foreground group-hover:text-accent-secondary transition-colors">
                        Premium apparel for every occasion
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=Accessories" className="group">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">Accessories</h3>
                      <p className="text-muted-foreground group-hover:text-accent-secondary transition-colors">
                        Complete your look with style
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/products?category=Footwear" className="group">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-muted/50 group-hover:bg-muted transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-2xl md:text-3xl font-bold mb-2">Footwear</h3>
                      <p className="text-muted-foreground group-hover:text-accent-secondary transition-colors">
                        Comfort meets style in every step
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
