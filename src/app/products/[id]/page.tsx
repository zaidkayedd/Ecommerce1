'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useStore } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { products, favorites, toggleFavorite } = useStore();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button onClick={() => router.push('/products')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isFavorite = favorites.includes(product.id);

  const handleFavoriteClick = () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }
    toggleFavorite(product.id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-custom">
          <Button
            variant="ghost"
            onClick={() => router.push('/products')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Product Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {!product.inStock && (
                <Badge className="absolute top-4 right-4 bg-muted-foreground">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <Badge className="bg-accent-secondary hover:bg-accent-secondary">
                  {product.category}
                </Badge>
              </div>

              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

              <p className="text-3xl font-bold text-accent-secondary mb-6">
                ${product.price.toFixed(2)}
              </p>

              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="flex gap-4 mt-auto">
                <Button
                  size="lg"
                  className="flex-1 bg-accent-secondary hover:bg-accent-secondary/90"
                  disabled={!product.inStock}
                >
                  Contact for Details
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleFavoriteClick}
                  className="hover:bg-accent-secondary/10"
                  title={currentUser ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Sign in to save favorites'}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite
                        ? 'fill-accent-secondary text-accent-secondary'
                        : ''
                    }`}
                  />
                </Button>
              </div>

              <Card className="mt-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Product Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="font-medium">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
