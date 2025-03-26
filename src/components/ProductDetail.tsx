
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getRelatedProducts } from "@/lib/products";
import { Product, ProductColor } from "@/lib/types";
import { ArrowLeft, Check, Minus, Plus, ShoppingCart } from "lucide-react";
import ProductGrid from "./ProductGrid";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Simulate loading data
    setIsLoading(true);
    
    // Short timeout to simulate loading
    const timeout = setTimeout(() => {
      const fetchedProduct = getProductById(id);
      setProduct(fetchedProduct);
      
      if (fetchedProduct) {
        setSelectedColor(fetchedProduct.colors[0]);
        setRelatedProducts(getRelatedProducts(id));
      }
      
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timeout);
  }, [id]);

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (!product || !selectedColor) return;
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      });
      navigate("/auth", { state: { from: `/product/${id}` } });
      return;
    }
    
    addItem(product, selectedColor, quantity);
    
    toast({
      title: "Added to cart",
      description: `${product.name} in ${selectedColor.name} has been added to your cart.`,
    });

    // Reset quantity after adding to cart
    setQuantity(1);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 animate-pulse">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-muted rounded-lg"></div>
            <div className="space-y-6">
              <div className="h-10 bg-muted rounded w-3/4"></div>
              <div className="h-24 bg-muted rounded"></div>
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-12 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="mt-4 text-muted-foreground">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={handleGoBack}
          className="mt-6 inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Go back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 md:px-6 py-16">
        {/* Back button */}
        <button
          onClick={handleGoBack}
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square overflow-hidden rounded-xl bg-secondary/30 animate-fade-in">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col animate-fade-up">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
              
              <p className="mt-4 text-xl font-semibold">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(product.price)}
              </p>
              
              <p className="mt-6 text-muted-foreground text-lg">{product.description}</p>

              {/* Color options */}
              <div className="mt-8">
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleColorSelect(color)}
                      className={cn(
                        "group relative h-10 w-10 rounded-full border-2 flex items-center justify-center transition-all",
                        selectedColor?.name === color.name
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      )}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Color: ${color.name}`}
                    >
                      {selectedColor?.name === color.name && (
                        <Check 
                          className={cn(
                            "h-4 w-4",
                            /^#([0-9A-F]{3}){1,2}$/i.test(color.value) && 
                            parseInt(color.value.substring(1), 16) > 0xffffff / 2 
                              ? "text-foreground" 
                              : "text-white"
                          )} 
                        />
                      )}
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mt-8">
                <h3 className="text-sm font-medium mb-3">Quantity</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 rounded-md border border-border hover:bg-secondary disabled:opacity-50 disabled:pointer-events-none"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="p-2 rounded-md border border-border hover:bg-secondary"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8">
                <h3 className="text-sm font-medium mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to cart button */}
              <button
                onClick={handleAddToCart}
                className={cn(
                  "mt-8 inline-flex items-center justify-center bg-primary text-primary-foreground",
                  "px-6 py-3 rounded-md font-medium transition-all hover:bg-primary/90",
                  "transform hover:-translate-y-1 hover:shadow-lg"
                )}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </button>

              {/* Specifications */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-medium mb-4">Specifications</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <dt className="text-sm text-muted-foreground">{key}</dt>
                      <dd className="text-sm font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductGrid
          products={relatedProducts}
          title="You May Also Like"
          description="Explore other premium products that complement your selection."
        />
      )}
    </div>
  );
};

export default ProductDetail;
