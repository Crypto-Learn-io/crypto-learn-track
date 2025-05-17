
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-6 md:py-8">
        {/* Header Section */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Have questions about cryptocurrency or need assistance? We're here to help!
          </p>
        </section>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-crypto-primary" />
                Email Us
              </CardTitle>
              <CardDescription>
                Send us an email and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-medium">cryptoleaner.co@gmail.com</p>
              <Button className="mt-4" asChild>
                <a href="mailto:cryptoleaner.co@gmail.com">
                  Send Email
                </a>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-crypto-primary" />
                Business Hours
              </CardTitle>
              <CardDescription>
                When you can expect to hear back from us
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday - Sunday:</span>
                  <span>Closed</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about our services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold">How quickly do you respond to emails?</h3>
                <p className="text-muted-foreground">We aim to respond to all inquiries within 24-48 business hours.</p>
              </div>
              <div>
                <h3 className="font-semibold">Do you offer consulting services?</h3>
                <p className="text-muted-foreground">Yes, we provide cryptocurrency investment consulting. Please email us for details.</p>
              </div>
              <div>
                <h3 className="font-semibold">How can I report issues with the website?</h3>
                <p className="text-muted-foreground">Please email us with details about the issue you're experiencing, and our technical team will address it.</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <footer className="border-t border-border py-6">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 CryptoLearn. All rights reserved.</p>
          <p className="mt-1">Market data provided for educational purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
