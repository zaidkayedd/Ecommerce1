'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStore();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'client' | 'admin'>('client');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      login(email, role);

      toast({
        title: 'Login Successful!',
        description: `Welcome back, ${email.split('@')[0]}!`,
      });

      // Redirect based on role
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container-custom max-w-md">
          <Card className="w-full">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-lg bg-accent-secondary flex items-center justify-center">
                <Lock className="h-6 w-6 text-accent-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>
                Choose your role and enter your email to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Role Selection */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Select your role</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRole('client')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        role === 'client'
                          ? 'border-accent-secondary bg-accent-secondary/5'
                          : 'border-border hover:border-accent-secondary/50'
                      }`}
                    >
                      <User className="h-6 w-6" />
                      <span className="font-medium">Client</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        role === 'admin'
                          ? 'border-accent-secondary bg-accent-secondary/5'
                          : 'border-border hover:border-accent-secondary/50'
                      }`}
                    >
                      <Shield className="h-6 w-6" />
                      <span className="font-medium">Admin</span>
                    </button>
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password (Demo) */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent-secondary hover:bg-accent-secondary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : `Sign In as ${role === 'client' ? 'Client' : 'Admin'}`}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                This is a demo application. Any email and password will work.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
