
import { useState, useEffect } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
}

const ProductGrid = ({ 
  products, 
  title = "Featured Products", 
  description 
}: ProductGridProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const currentContainer = document.getElementById("product-grid");
    if (currentContainer) {
      observer.observe(currentContainer);
    }
    
    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  return (
    <section className="py-16 sm:py-24" id="product-grid">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className={`text-3xl font-bold tracking-tight md:text-4xl ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            {title}
          </h2>
          {description && (
            <p className={`mt-4 text-muted-foreground text-lg ${isVisible ? 'animate-fade-up animation-delay-100' : 'opacity-0'}`}>
              {description}
            </p>
          )}
        </div>
        
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
