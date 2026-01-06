'use client';

import { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/lib/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addMessage } = useStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you soon.',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
              <p className="text-muted-foreground text-lg">
                Have a question or feedback? We'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Form */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="What is this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Your message..."
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent-secondary hover:bg-accent-secondary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-5 w-5 text-accent-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <p className="text-muted-foreground">support@luxestyle.com</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-5 w-5 text-accent-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Phone</h3>
                          <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-lg bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-accent-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Address</h3>
                          <p className="text-muted-foreground">
                            123 Fashion Street<br />
                            New York, NY 10001
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-accent-secondary/5 border-accent-secondary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Business Hours</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Saturday</span>
                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sunday</span>
                        <span className="font-medium">Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
