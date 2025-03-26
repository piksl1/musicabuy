
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/lib/products";
import { ArrowRight, Headphones, Speaker, Watch, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Superior Sound",
    description: "Experience premium audio quality with our innovative acoustic technology."
  },
  {
    icon: <Speaker className="h-6 w-6" />,
    title: "Elegant Design",
    description: "Meticulously crafted products that combine functionality with aesthetic beauty."
  },
  {
    icon: <Watch className="h-6 w-6" />,
    title: "Seamless Connectivity",
    description: "Effortlessly connect with your devices for uninterrupted enjoyment."
  },
  {
    icon: <Tablet className="h-6 w-6" />,
    title: "Long-lasting Battery",
    description: "Enjoy your content for longer with our energy-efficient technology."
  }
];

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 3));
  const [isVisible, setIsVisible] = useState({
    features: false,
    categories: false
  });

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    const featureObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, features: true }));
          featureObserver.disconnect();
        }
      },
      observerOptions
    );

    const categoryObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, categories: true }));
          categoryObserver.disconnect();
        }
      },
      observerOptions
    );

    const featuresElement = document.getElementById("features-section");
    const categoriesElement = document.getElementById("categories-section");

    if (featuresElement) featureObserver.observe(featuresElement);
    if (categoriesElement) categoryObserver.observe(categoriesElement);

    return () => {
      if (featuresElement) featureObserver.unobserve(featuresElement);
      if (categoriesElement) categoryObserver.unobserve(categoriesElement);
    };
  }, []);

  return (
    <Layout>
      <Hero />

      {/* Featured products section */}
      <ProductGrid 
        products={featuredProducts}
        title="Featured Products"
        description="Discover our selection of premium audio equipment and tech accessories."
      />

      {/* Features section */}
      <section className="py-16 sm:py-24 bg-secondary" id="features-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className={`text-3xl font-bold tracking-tight md:text-4xl ${isVisible.features ? 'animate-fade-up' : 'opacity-0'}`}>
              Why Choose AudioPhase
            </h2>
            <p className={`mt-4 text-muted-foreground text-lg ${isVisible.features ? 'animate-fade-up animation-delay-100' : 'opacity-0'}`}>
              Our commitment to quality and innovation sets us apart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-card p-6 rounded-xl border border-border ${isVisible.features ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100 + 200}ms` }}
              >
                <div className="p-3 bg-primary/10 rounded-lg inline-flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-16 sm:py-24" id="categories-section">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className={`text-3xl font-bold tracking-tight md:text-4xl ${isVisible.categories ? 'animate-fade-up' : 'opacity-0'}`}>
              Explore Categories
            </h2>
            <p className={`mt-4 text-muted-foreground text-lg ${isVisible.categories ? 'animate-fade-up animation-delay-100' : 'opacity-0'}`}>
              Browse our collections by category to find exactly what you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/category/audio"
              className={cn(
                "relative group overflow-hidden rounded-xl h-64 bg-cover bg-center flex items-end",
                "transition-transform hover:-translate-y-1 hover:shadow-lg",
                isVisible.categories ? 'animate-fade-up animation-delay-200' : 'opacity-0'
              )}
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop')"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="relative p-6 w-full flex justify-between items-center">
                <h3 className="text-white text-2xl font-bold">Audio</h3>
                <span className="p-2 rounded-full bg-white/20 text-white group-hover:bg-primary transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>

            <Link
              to="/category/speakers"
              className={cn(
                "relative group overflow-hidden rounded-xl h-64 bg-cover bg-center flex items-end",
                "transition-transform hover:-translate-y-1 hover:shadow-lg",
                isVisible.categories ? 'animate-fade-up animation-delay-300' : 'opacity-0'
              )}
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop')"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="relative p-6 w-full flex justify-between items-center">
                <h3 className="text-white text-2xl font-bold">Speakers</h3>
                <span className="p-2 rounded-full bg-white/20 text-white group-hover:bg-primary transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>

            <Link
              to="/category/wearables"
              className={cn(
                "relative group overflow-hidden rounded-xl h-64 bg-cover bg-center flex items-end",
                "transition-transform hover:-translate-y-1 hover:shadow-lg",
                isVisible.categories ? 'animate-fade-up animation-delay-400' : 'opacity-0'
              )}
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop')"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="relative p-6 w-full flex justify-between items-center">
                <h3 className="text-white text-2xl font-bold">Wearables</h3>
                <span className="p-2 rounded-full bg-white/20 text-white group-hover:bg-primary transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>

            <Link
              to="/category/computing"
              className={cn(
                "relative group overflow-hidden rounded-xl h-64 bg-cover bg-center flex items-end",
                "transition-transform hover:-translate-y-1 hover:shadow-lg",
                isVisible.categories ? 'animate-fade-up animation-delay-500' : 'opacity-0'
              )}
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1623126908029-58cb08a2b618?q=80&w=1000&auto=format&fit=crop')"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="relative p-6 w-full flex justify-between items-center">
                <h3 className="text-white text-2xl font-bold">Computing</h3>
                <span className="p-2 rounded-full bg-white/20 text-white group-hover:bg-primary transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-4">
              Stay Updated
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Subscribe to our newsletter for new product announcements and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button 
                className={cn(
                  "inline-flex items-center justify-center bg-primary text-primary-foreground shrink-0",
                  "px-6 py-3 rounded-md font-medium transition-all hover:bg-primary/90",
                  "transform hover:-translate-y-1"
                )}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
