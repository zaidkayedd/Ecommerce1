'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Heart, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, favorites, logout } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
    { href: '/favorites', label: 'Favorites' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 items-center">
        {/* Logo - Left */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent-secondary flex items-center justify-center">
              <span className="text-xl font-bold text-accent-secondary-foreground">L</span>
            </div>
            <span className="text-xl font-bold">LuxeStyle</span>
          </div>
        </Link>

        {/* Desktop Navigation - Center */}
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent-secondary ${
                pathname === link.href ? 'text-accent-secondary' : 'text-muted-foreground'
              }`}
            >
              {link.label}
              {link.href === '/favorites' && favorites.length > 0 && (
                <span className="ml-1 text-xs bg-accent-secondary text-accent-secondary-foreground px-1.5 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions - Right */}
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-4">
              {currentUser.role === 'admin' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/admin/dashboard')}
                  className="flex items-center gap-2"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              )}
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="font-medium">{currentUser.name}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => router.push('/login')}
              className="bg-accent-secondary hover:bg-accent-secondary/90"
            >
              Sign In
            </Button>
          )}
        </div>

        {/* Mobile Menu Button - Right */}
        <button
          className="md:hidden p-2 flex-shrink-0 ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container-custom py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-sm font-medium py-2 text-center ${
                  pathname === link.href ? 'text-accent-secondary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
                {link.href === '/favorites' && favorites.length > 0 && (
                  <span className="ml-2 text-xs bg-accent-secondary text-accent-secondary-foreground px-1.5 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-4 border-t">
              {currentUser ? (
                <div className="space-y-3">
                  {currentUser.role === 'admin' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        router.push('/admin/dashboard');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  )}
                  <div className="flex items-center gap-2 text-sm py-2 justify-center">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{currentUser.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => {
                    router.push('/login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-accent-secondary hover:bg-accent-secondary/90"
                >
                  Sign In
                </Button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
