
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CheckoutSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;
  const paymentMethod = location.state?.paymentMethod;

  useEffect(() => {
    // If no orderId is provided, redirect to home
    if (!orderId) {
      navigate('/');
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [orderId, navigate]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          
          <p className="text-muted-foreground mb-2">
            Thank you for your purchase. Your order #{orderId} has been placed successfully. 
            We'll send you an email confirmation with details and tracking information.
          </p>
          
          {paymentMethod && (
            <p className="text-muted-foreground mb-8">
              Payment method: {paymentMethod}
            </p>
          )}
          
          <div className="space-y-4">
            <Button asChild className="w-full">
              <Link to="/products">Continue Shopping</Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full">
              <Link to="/profile">View Order History</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutSuccessPage;
