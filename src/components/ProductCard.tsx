
import { Link } from "react-router-dom";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { id, name, description, price, image } = product;
  
  // Format the price with appropriate currency symbol and decimal places
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  // Calculate animation delay based on index for staggered animations
  const animationDelay = index * 100;

  return (
    <Link
      to={`/product/${id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all",
        "hover:shadow-lg hover:-translate-y-1 animate-fade-up"
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="flex flex-col justify-between flex-grow p-5">
        <div>
          <h3 className="font-bold text-lg tracking-tight mb-1">{name}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{description}</p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <p className="font-semibold text-lg">{formattedPrice}</p>
          <span className="rounded-full p-2 bg-secondary text-secondary-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
