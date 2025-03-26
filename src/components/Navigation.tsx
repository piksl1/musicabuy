
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { NavigationItem } from "@/lib/types";
import { Menu, X, ShoppingCart, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigationItems: NavigationItem[] = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-effect py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-foreground font-display font-bold text-xl transition-opacity hover:opacity-80"
          >
            MusicaBuy
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-1",
                  location.pathname === item.href
                    ? "text-primary"
                    : "text-foreground/80"
                )}
              >
                {item.name}
                {location.pathname === item.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            <Link 
              to="/cart" 
              className="p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label="User profile"
                >
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="p-2 rounded-full hover:bg-secondary transition-colors"
                aria-label="Sign in"
              >
                <LogIn className="h-5 w-5" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect animate-fade-in border-t mt-3">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navigationItems.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-base font-medium py-2 px-2 rounded-md transition-colors",
                  location.pathname === item.href
                    ? "bg-secondary text-primary font-semibold"
                    : "text-foreground/80 hover:bg-secondary"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item.name}
              </Link>
            ))}
            <div className="py-2 px-2">
              <ThemeToggle />
            </div>
            <Link
              to="/cart"
              className="text-base font-medium py-2 px-2 rounded-md transition-colors flex items-center space-x-2 text-foreground/80 hover:bg-secondary"
              style={{ animationDelay: `${navigationItems.length * 50}ms` }}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="text-base font-medium py-2 px-2 rounded-md transition-colors flex items-center space-x-2 text-foreground/80 hover:bg-secondary"
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-base font-medium py-2 px-2 rounded-md transition-colors flex items-center space-x-2 text-foreground/80 hover:bg-secondary w-full text-left"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="text-base font-medium py-2 px-2 rounded-md transition-colors flex items-center space-x-2 text-foreground/80 hover:bg-secondary"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
