
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Shield, Bell, Database } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary">
        <div className="container mx-auto px-4 py-6 md:py-12 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <h1 className="text-2xl md:text-4xl font-bold text-white">imFuyo</h1>
            <span className="bg-white text-primary px-2 py-1 rounded text-xs md:text-sm font-bold">YAM</span>
          </div>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
            Protect your valuable livestock with our advanced tracking solution 
            designed specifically for Eastern Cape farmers.
          </p>
          <div className="mt-8">
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Tracking Your Livestock
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Features Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Protect What Matters Most
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MapPin className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Real-Time Tracking</h3>
                    <p className="text-muted-foreground">
                      Know exactly where your livestock is at all times with GPS tracking
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Theft Prevention</h3>
                    <p className="text-muted-foreground">
                      Get alerts if your animals leave designated areas unexpectedly
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Instant Alerts</h3>
                    <p className="text-muted-foreground">
                      Receive notifications for unusual movements or boundary crossings
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Database className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Livestock Management</h3>
                    <p className="text-muted-foreground">
                      Track individual animals with detailed profiles and health records
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
              How ImFuyo Works
            </h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              Our simple three-step process makes it easy to keep your livestock safe and secure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary text-2xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Attach Trackers</h3>
                <p className="text-muted-foreground">
                  Simply attach our durable GPS trackers to your livestock's ears or collars
                </p>
              </div>

              <div className="text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary text-2xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Set Up Boundaries</h3>
                <p className="text-muted-foreground">
                  Define safe zones on your farm where your animals should stay
                </p>
              </div>

              <div className="text-center">
                <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-secondary text-2xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Track & Get Alerts</h3>
                <p className="text-muted-foreground">
                  Monitor your animals in real-time and receive alerts if they leave safe zones
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Protect Your Livestock?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Start using imFuyo YAM today to keep your valuable animals safe from theft and track their well-being.
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get Started Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <span className="text-xl font-bold">imFuyo</span>
            <span className="bg-primary text-primary-foreground px-2 rounded text-xs font-bold">YAM</span>
          </div>
          <p className="text-muted-foreground">
            Protecting Eastern Cape livestock with advanced tracking technology
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            &copy; 2025 imFuyo YAM. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
