'use client';

import { Heart } from 'lucide-react';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FavoritesPage() {
  const { products, favorites } = useStore();
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3 justify-center">
              <Heart className="h-8 w-8 fill-accent-secondary text-accent-secondary" />
              Favorites
            </h1>
            <p className="text-muted-foreground">
              {favoriteProducts.length === 0
                ? 'You have no favorite items yet.'
                : `${favoriteProducts.length} item${favoriteProducts.length !== 1 ? 's' : ''} saved`
              }
            </p>
          </div>

          {/* Products Grid */}
          {favoriteProducts.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="inline-flex h-20 w-20 rounded-full bg-muted items-center justify-center mb-6">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No favorites yet</h2>
              <p className="text-muted-foreground mb-6">
                Start exploring our products and save your favorites by clicking the heart icon.
              </p>
              <Link href="/products">
                <Button className="bg-accent-secondary hover:bg-accent-secondary/90">
                  Browse Products
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {favoriteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
