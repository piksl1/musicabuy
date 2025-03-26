
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/lib/products";
import { Product } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (category) {
      const filtered = products.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
      setCategoryProducts(filtered);
    }
  }, [category]);

  const formatCategoryName = (name: string | undefined): string => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getCategoryDescription = (name: string): string => {
    switch (name.toLowerCase()) {
      case "audio":
        return "Premium headphones and earbuds for immersive sound experiences.";
      case "speakers":
        return "High-quality speakers for your home and outdoor adventures.";
      case "wearables":
        return "Smart wearable technology for an active lifestyle.";
      case "computing":
        return "Powerful computing devices designed for productivity and creativity.";
      default:
        return "Browse our collection of premium products.";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <Link 
          to="/products" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> All Products
        </Link>
        
        {categoryProducts.length > 0 ? (
          <ProductGrid 
            products={categoryProducts} 
            title={formatCategoryName(category)}
            description={getCategoryDescription(category || "")}
          />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">{formatCategoryName(category)}</h2>
            <p className="text-muted-foreground">
              No products found in this category.
            </p>
            <Link to="/products" className="mt-6 inline-block text-primary hover:underline">
              View all products
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
