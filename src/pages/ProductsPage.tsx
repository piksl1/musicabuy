
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Audio",
  "Speakers",
  "Wearables",
  "Computing"
];

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (activeCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(product => product.category === activeCategory)
      );
    }
  }, [activeCategory]);

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl animate-fade-down">
            Our Products
          </h1>
          <p className="mt-4 text-muted-foreground text-lg animate-fade-down animation-delay-100">
            Browse our premium collection of audio equipment and tech accessories.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-fade-up animation-delay-200">
          {categories.map((category, index) => (
            <button
              key={category}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === category 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} title="" />
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
