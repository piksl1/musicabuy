
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const CartPage = () => {
  const { state, removeItem, updateQuantity, getCartTotal, clearCart } = useCart();
  const { items } = state;
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleQuantityChange = (id: string, currentQuantity: number, change: number) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to checkout",
        variant: "destructive",
      });
      return;
    }

    try {
      // Convert cart items to a format that can be stored as JSON
      const serializedItems = JSON.parse(JSON.stringify(items));
      
      // Store order in database
      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: getCartTotal(),
          status: 'pending',
          items: serializedItems
        })
        .select('id')
        .single();

      if (error) throw error;

      // Show success message
      toast({
        title: "Order created!",
        description: `Please complete payment to finalize your order.`,
      });

      // Redirect to the payment page
      navigate('/payment', { 
        state: { 
          orderId: data.id,
          total: getCartTotal()
        } 
      });
      
      // Clear cart after order is created and payment is initiated
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="bg-card rounded-lg shadow-sm p-6">
            <p className="text-center text-muted-foreground py-8">
              Your cart is currently empty.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/products" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="bg-card rounded-lg shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    {/* Product image */}
                    <div className="w-full sm:w-20 aspect-square rounded-md overflow-hidden bg-secondary/30">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg truncate">
                        <Link to={`/product/${item.productId}`} className="hover:text-primary transition-colors">
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Color: {item.color.name}
                      </p>
                      <p className="font-medium mt-2">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(item.price)}
                      </p>
                    </div>
                    
                    {/* Quantity control */}
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        disabled={item.quantity <= 1}
                        className="p-1 rounded-md border border-border hover:bg-secondary disabled:opacity-50 disabled:pointer-events-none"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        className="p-1 rounded-md border border-border hover:bg-secondary"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    {/* Subtotal */}
                    <div className="text-right min-w-[80px]">
                      <p className="font-semibold">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(item.price * item.quantity)}
                      </p>
                    </div>
                    
                    {/* Remove button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cart summary */}
            <div className="bg-card rounded-lg shadow-sm p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Subtotal</span>
                  <span>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(getCartTotal())}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>
                <Button 
                  className="w-full py-6 text-base" 
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
                <div className="text-center">
                  <Link to="/products" className="text-sm text-primary hover:underline">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
