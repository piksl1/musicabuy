import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white to-secondary dark:from-background dark:to-background/50 z-0"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
        }}
      />

      {/* Floating elements for visual interest */}
      <div
        className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />
      <div
        className="absolute bottom-1/3 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl z-0"
        style={{
          transform: `translateY(${scrollY * -0.05}px)`,
        }}
      />

      <div className="container mx-auto px-4 md:px-6 py-20 sm:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="max-w-xl space-y-6 animate-fade-up">
            <div className="inline-block">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                New Release
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-balance">
              Experience Sound <br />
              Like Never Before
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl md:text-balance">
              Immerse yourself in premium audio quality with our innovative
              products designed for the way you live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                to="/products"
                className={cn(
                  "inline-flex items-center justify-center bg-primary text-primary-foreground",
                  "px-6 py-3 rounded-md font-medium transition-all hover:bg-primary/90",
                  "transform hover:-translate-y-1 hover:shadow-lg"
                )}
              >
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className={cn(
                  "inline-flex items-center justify-center bg-secondary text-secondary-foreground",
                  "px-6 py-3 rounded-md font-medium hover:bg-secondary/80 transition-all",
                  "transform hover:-translate-y-1"
                )}
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Image */}
          <div
            className="relative lg:ml-auto"
            style={{
              transform: `translateY(${scrollY * -0.08}px)`,
            }}
          >
            <div className="relative mx-auto w-full max-w-md aspect-square animate-fade-in animation-delay-200">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1532778489370-ffc5d2095091?q=80&w=1000&auto=format&fit=crop"
                alt="Premium Headphones"
                className="relative z-10 object-contain w-full h-full rounded-xl transform rotate-12 animate-scale-in animation-delay-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-fade-in animation-delay-500">
        <span className="text-sm text-muted-foreground mb-2">
          Scroll to explore
        </span>
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce mt-1" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
