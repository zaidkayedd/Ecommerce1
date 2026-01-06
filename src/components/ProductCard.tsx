'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { favorites, toggleFavorite, currentUser } = useStore();
  const isFavorite = favorites.includes(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    toggleFavorite(product.id);
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Badge className="absolute top-3 left-3 bg-accent-secondary hover:bg-accent-secondary">
              {product.category}
            </Badge>
            {!product.inStock && (
              <Badge className="absolute top-3 right-3 bg-muted-foreground">
                Out of Stock
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <Link href={`/products/${product.id}`} className="w-full">
          <h3 className="font-semibold text-lg group-hover:text-accent-secondary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {product.description}
          </p>
        </Link>
        <div className="flex items-center justify-between w-full mt-2">
          <span className="text-2xl font-bold text-accent-secondary">
            ${product.price.toFixed(2)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            className="hover:bg-accent-secondary/10"
            title={currentUser ? (isFavorite ? 'Remove from favorites' : 'Add to favorites') : 'Sign in to save favorites'}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorite
                  ? 'fill-accent-secondary text-accent-secondary'
                  : 'text-muted-foreground'
              }`}
            />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
