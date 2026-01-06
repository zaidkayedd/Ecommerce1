'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, LogOut, LayoutDashboard, MessageSquare, Package, Trash2, Edit, X, Save, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/lib/store';
import { Product, ContactMessage } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categories } from '@/lib/mock-data';

export default function AdminDashboard() {
  const router = useRouter();
  const { products, messages, currentUser, addProduct, updateProduct, deleteProduct, deleteMessage, logout } = useStore();
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newProductImage, setNewProductImage] = useState<string>('');
  const [editProductImage, setEditProductImage] = useState<string>('');

  // Form state for adding product
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true,
  });

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: newProductImage || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
      inStock: newProduct.inStock,
    });

    toast({
      title: 'Product Added!',
      description: 'The product has been successfully added.',
    });

    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      inStock: true,
    });
    setNewProductImage('');
    setIsAddDialogOpen(false);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      ...editingProduct,
      image: editProductImage || editingProduct.image,
    });

    toast({
      title: 'Product Updated!',
      description: 'The product has been successfully updated.',
    });

    setEditingProduct(null);
    setEditProductImage('');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      toast({
        title: 'Product Deleted!',
        description: 'The product has been successfully deleted.',
      });
    }
  };

  const handleDeleteMessage = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      deleteMessage(id);
      toast({
        title: 'Message Deleted!',
        description: 'The message has been successfully deleted.',
      });
    }
  };

  const handleImageUpload = (file: File, setCallback: (url: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setCallback(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Check if user is admin
  if (!currentUser || currentUser.role !== 'admin') {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-custom">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {currentUser.name}</p>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Products
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{products.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  In Stock
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {products.filter(p => p.inStock).length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Messages
                </CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{messages.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Products Management</h2>
                  <p className="text-muted-foreground">Add, edit, or delete products</p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-accent-secondary hover:bg-accent-secondary/90">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Product</DialogTitle>
                      <DialogDescription>
                        Fill in the details to add a new product
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          rows={4}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="price">Price ($)</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select value={newProduct.category} onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.slice(1).map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="image">Product Image</Label>
                        <div className="space-y-2">
                          <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(file, setNewProductImage);
                            }}
                            className="cursor-pointer"
                          />
                          {newProductImage && (
                            <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                              <img
                                src={newProductImage}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="inStock"
                          checked={newProduct.inStock}
                          onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                          className="h-4 w-4"
                        />
                        <Label htmlFor="inStock">In Stock</Label>
                      </div>
                      <Button type="submit" className="w-full bg-accent-secondary hover:bg-accent-secondary/90">
                        Add Product
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {products.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                            </div>
                            <Badge variant={product.inStock ? 'default' : 'secondary'}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                          </div>
                          <p className="text-2xl font-bold text-accent-secondary">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Dialog open={editingProduct?.id === product.id} onOpenChange={(open) => !open && setEditingProduct(null)}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon" onClick={() => {
                                setEditingProduct(product);
                                setEditProductImage('');
                              }}>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription>
                                  Update the product information
                                </DialogDescription>
                              </DialogHeader>
                              {editingProduct && (
                                <form onSubmit={handleUpdateProduct} className="space-y-4">
                                  <div>
                                    <Label htmlFor="edit-name">Product Name</Label>
                                    <Input
                                      id="edit-name"
                                      value={editingProduct.name}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                      required
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-description">Description</Label>
                                    <Textarea
                                      id="edit-description"
                                      value={editingProduct.description}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                      rows={4}
                                      required
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="edit-price">Price ($)</Label>
                                      <Input
                                        id="edit-price"
                                        type="number"
                                        step="0.01"
                                        value={editingProduct.price}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                        required
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-category">Category</Label>
                                      <Select value={editingProduct.category} onValueChange={(value) => setEditingProduct({ ...editingProduct, category: value })}>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {categories.slice(1).map((cat) => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-image">Product Image</Label>
                                    <div className="space-y-2">
                                      <div className="flex gap-2">
                                        <Input
                                          id="edit-image"
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleImageUpload(file, setEditProductImage);
                                          }}
                                          className="cursor-pointer"
                                        />
                                      </div>
                                      <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                                        <img
                                          src={editProductImage || editingProduct.image}
                                          alt="Preview"
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      id="edit-inStock"
                                      checked={editingProduct.inStock}
                                      onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                                      className="h-4 w-4"
                                    />
                                    <Label htmlFor="edit-inStock">In Stock</Label>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button type="submit" className="flex-1 bg-accent-secondary hover:bg-accent-secondary/90">
                                      <Save className="mr-2 h-4 w-4" />
                                      Save Changes
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => {
                                        setEditingProduct(null);
                                        setEditProductImage('');
                                      }}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Contact Messages</h2>
                <p className="text-muted-foreground">View and manage messages from the contact form</p>
              </div>

              {messages.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No messages yet</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card key={message.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold">{message.name}</h3>
                              <Badge variant="outline">{message.date}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{message.email}</p>
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Subject</p>
                            <p className="font-medium">{message.subject}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground mb-1">Message</p>
                            <p className="text-sm">{message.message}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
