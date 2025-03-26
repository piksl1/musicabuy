
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, ProductColor } from '@/lib/types';

// Define cart item type
export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  color: ProductColor;
  quantity: number;
}

// Define cart state
interface CartState {
  items: CartItem[];
}

// Define cart actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Create initial state
const initialState: CartState = {
  items: [],
};

// Create cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => 
          item.productId === action.payload.productId && 
          item.color.name === action.payload.color.name
      );

      if (existingItemIndex >= 0) {
        // If item already exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // If item doesn't exist, add it
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
      
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
      
    default:
      return state;
  }
};

// Define context type
interface CartContextType {
  state: CartState;
  addItem: (product: Product, color: ProductColor, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Generate a unique ID for cart items
  const generateCartItemId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  // Add item to cart
  const addItem = (product: Product, color: ProductColor, quantity: number) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: generateCartItemId(),
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        color,
        quantity,
      },
    });
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id,
    });
  };

  // Update item quantity
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity },
    });
  };

  // Clear cart
  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    });
  };

  // Calculate cart total
  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
