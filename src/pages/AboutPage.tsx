
import React from "react";
import Layout from "@/components/Layout";
import { CalendarDays, MapPin, Users } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero section */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">About MusicaBuy</h1>
          <p className="text-xl text-muted-foreground">
            Bringing premium audio experiences to music lovers since 2012.
          </p>
        </div>

        {/* Story section */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="space-y-6 text-lg">
            <p>
              MusicaBuy was founded in 2012 by a group of audio engineers and music enthusiasts who were 
              frustrated with the lack of high-quality audio equipment available to consumers at reasonable prices.
            </p>
            <p>
              What began as a small workshop in San Francisco has grown into a global brand known for its 
              innovative designs, superior sound quality, and commitment to environmental sustainability.
            </p>
            <p>
              We believe that everyone deserves to experience music the way it was meant to be heard - with 
              depth, clarity, and emotion. Every product we create is designed with this philosophy in mind.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border text-center">
            <Users className="h-10 w-10 mx-auto text-primary mb-4" />
            <h3 className="text-3xl font-bold mb-2">250,000+</h3>
            <p className="text-muted-foreground">Happy Customers</p>
          </div>
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border text-center">
            <MapPin className="h-10 w-10 mx-auto text-primary mb-4" />
            <h3 className="text-3xl font-bold mb-2">42</h3>
            <p className="text-muted-foreground">Countries Served</p>
          </div>
          <div className="bg-card rounded-xl p-8 shadow-sm border border-border text-center">
            <CalendarDays className="h-10 w-10 mx-auto text-primary mb-4" />
            <h3 className="text-3xl font-bold mb-2">12</h3>
            <p className="text-muted-foreground">Years of Excellence</p>
          </div>
        </div>

        {/* Values */}
        <div className="mx-auto max-w-3xl mb-20">
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Quality First</h3>
              <p className="text-muted-foreground">
                We never compromise on the quality of our products. From design to manufacturing, 
                every step is carefully executed to ensure excellence.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                We're constantly pushing the boundaries of what's possible in audio technology, 
                seeking new ways to enhance your listening experience.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to reducing our environmental impact through responsible 
                sourcing, eco-friendly packaging, and energy-efficient manufacturing.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
              <p className="text-muted-foreground">
                Your satisfaction is our priority. We stand behind our products with 
                excellent customer service and support.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-muted mb-4" />
              <h3 className="font-semibold">Emma Rodriguez</h3>
              <p className="text-sm text-muted-foreground">CEO & Co-Founder</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-muted mb-4" />
              <h3 className="font-semibold">David Chen</h3>
              <p className="text-sm text-muted-foreground">CTO & Co-Founder</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-muted mb-4" />
              <h3 className="font-semibold">Sarah Johnson</h3>
              <p className="text-sm text-muted-foreground">Head of Design</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
