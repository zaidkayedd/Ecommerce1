'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ContactMessage, User } from '@/types';
import { mockProducts, mockMessages } from '@/lib/mock-data';

interface StoreContextType {
  products: Product[];
  messages: ContactMessage[];
  favorites: string[];
  currentUser: User | null;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addMessage: (message: Omit<ContactMessage, 'id' | 'date'>) => void;
  deleteMessage: (id: string) => void;
  toggleFavorite: (productId: string) => void;
  login: (email: string, role: 'client' | 'admin') => void;
  logout: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const savedMessages = localStorage.getItem('messages');
    const savedFavorites = localStorage.getItem('favorites');
    const savedUser = localStorage.getItem('currentUser');

    setProducts(savedProducts ? JSON.parse(savedProducts) : mockProducts);
    setMessages(savedMessages ? JSON.parse(savedMessages) : mockMessages);
    setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
    setCurrentUser(savedUser ? JSON.parse(savedUser) : null);
  }, []);

  // Save products to localStorage when they change
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save user to localStorage when they change
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    setFavorites(favorites.filter(favId => favId !== id));
  };

  const addMessage = (message: Omit<ContactMessage, 'id' | 'date'>) => {
    const newMessage: ContactMessage = {
      ...message,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    setMessages([newMessage, ...messages]);
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(favorites.includes(productId)
      ? favorites.filter(favId => favId !== productId)
      : [...favorites, productId]
    );
  };

  const login = (email: string, role: 'client' | 'admin') => {
    const user: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role,
    };
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <StoreContext.Provider value={{
      products,
      messages,
      favorites,
      currentUser,
      addProduct,
      updateProduct,
      deleteProduct,
      addMessage,
      deleteMessage,
      toggleFavorite,
      login,
      logout,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
