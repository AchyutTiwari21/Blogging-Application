import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Edit3, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-0" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-primary mb-6">
              Share Your Story with the World
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Create, publish, and grow your audience with our powerful blogging platform.
              Start your journey today and let your voice be heard.
            </p>
            <div className="flex gap-4 justify-center">

              <Link to="/blog">"
              <Button 
              size="lg"
              className="cursor-pointer"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              </Link>

              <Button 
              size="lg" 
              variant="outline"
              className="cursor-pointer"
              >
                Learn More
              </Button>

            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to create amazing content
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Edit3 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Rich Text Editor</h3>
            <p className="text-muted-foreground">
              Write beautiful posts with our intuitive editor. Support for markdown, images,
              and more.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Grow Your Audience</h3>
            <p className="text-muted-foreground">
              Built-in SEO tools and social sharing features to help you reach more readers.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <Sparkles className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Custom Themes</h3>
            <p className="text-muted-foreground">
              Make your blog stand out with beautiful, customizable themes.
            </p>
          </Card>
        </div>
      </div>

      {/* Featured Blogs Section */}
      <div className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Stories
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={`https://images.unsplash.com/photo-167${i}956227${i}-7d79b6b9c${i}ee?auto=format&fit=crop&w=800&q=80`}
                  alt={`Featured blog ${i}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    The Art of Storytelling
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Discover how to craft compelling narratives that captivate your readers...
                  </p>
                  <Button variant="ghost" className="group">
                    Read More
                    <BookOpen className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Blogging Journey?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of writers and creators who are already sharing their stories.
          </p>

          <Link to="/blog">
          <Button 
          size="lg" 
          className="w-full md:w-auto cursor-pointer">
            Create Your Blog Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          </Link>
        </div>
      </div>

     
    </div>
    );
}