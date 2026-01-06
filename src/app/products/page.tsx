'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categories } from '@/lib/mock-data';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const { products } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Products</h1>
            <p className="text-muted-foreground">Discover our curated collection</p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Category Filters */}
            <div className={`flex flex-wrap gap-2 ${showFilters ? 'block' : 'hidden md:flex'}`}>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category
                      ? 'bg-accent-secondary hover:bg-accent-secondary'
                      : 'hover:bg-accent-secondary hover:text-accent-secondary-foreground'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No products found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Results Count */}
              <div className="mt-8 text-center text-sm text-muted-foreground">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
