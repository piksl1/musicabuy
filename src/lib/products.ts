import { Product } from "./types";

export const products: Product[] = [
  {
    id: "headphones-pro",
    name: "AudioPhase Pro",
    description:
      "Premium wireless headphones with noise cancellation and spatial audio for an immersive listening experience.",
    price: 349.99,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Active Noise Cancellation",
      "Spatial Audio",
      "40-hour battery life",
      "Premium sound quality",
      "Comfortable design for all-day wear",
    ],
    colors: [
      { name: "Space Gray", value: "#1F2937" },
      { name: "Silver", value: "#E5E7EB" },
      { name: "Midnight Blue", value: "#1E3A8A" },
    ],
    specs: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz-20kHz",
      Connectivity: "Bluetooth 5.2",
      Battery: "40 hours",
      Weight: "255g",
    },
    relatedProducts: ["earbuds-wireless", "speaker-home", "speaker-portable"],
  },
  {
    id: "earbuds-wireless",
    name: "AudioPhase Buds",
    description:
      "Ultra-compact wireless earbuds with crystal clear sound and perfect fit for active lifestyles.",
    price: 159.99,
    category: "Audio",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Touch controls",
      "Water resistant (IPX4)",
      "24-hour battery with case",
      "Active noise isolation",
      "Customizable fit",
    ],
    colors: [
      { name: "White", value: "#FFFFFF" },
      { name: "Black", value: "#000000" },
      { name: "Teal", value: "#14B8A6" },
    ],
    specs: {
      "Driver Size": "11mm",
      "Frequency Response": "20Hz-20kHz",
      Connectivity: "Bluetooth 5.2",
      Battery: "6 hours (24 with case)",
      Weight: "5.4g per earbud",
    },
    relatedProducts: ["headphones-pro", "speaker-home", "speaker-portable"],
  },
  {
    id: "speaker-home",
    name: "AudioPhase Home",
    description:
      "Smart home speaker with room-filling sound and voice assistant integration for the modern living space.",
    price: 249.99,
    category: "Speakers",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
    features: [
      "360° sound",
      "Voice assistant compatible",
      "Multi-room audio",
      "Adaptive EQ",
      "Elegant design",
    ],
    colors: [
      { name: "Charcoal", value: "#333333" },
      { name: "Sand", value: "#E7E5DE" },
      { name: "Sage", value: "#74A589" },
    ],
    specs: {
      "Speaker Units": "1 woofer, 2 tweeters",
      "Frequency Response": "45Hz-20kHz",
      Connectivity: "Wi-Fi, Bluetooth 5.0",
      Power: "AC adapter",
      Dimensions: '6.8" × 5.6"',
    },
    relatedProducts: ["headphones-pro", "earbuds-wireless", "speaker-portable"],
  },
  {
    id: "speaker-portable",
    name: "AudioPhase Go",
    description:
      "Portable Bluetooth speaker with incredible sound quality and rugged design for adventures anywhere.",
    price: 129.99,
    category: "Speakers",
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Waterproof (IPX7)",
      "12-hour battery life",
      "Durable design",
      "Carabiner included",
      "USB-C charging",
    ],
    colors: [
      { name: "Ocean Blue", value: "#0284C7" },
      { name: "Coral", value: "#F43F5E" },
      { name: "Charcoal", value: "#1F2937" },
    ],
    specs: {
      "Speaker Units": "2 full-range drivers",
      "Frequency Response": "80Hz-20kHz",
      Connectivity: "Bluetooth 5.1",
      Battery: "12 hours",
      Dimensions: '3.2" × 7.8"',
    },
    relatedProducts: ["headphones-pro", "earbuds-wireless", "speaker-home"],
  },
  {
    id: "smartwatch",
    name: "TechPro Watch",
    description:
      "Advanced smartwatch with health monitoring and seamless connectivity for an active lifestyle.",
    price: 299.99,
    category: "Wearables",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    features: [
      "Health tracking",
      "ECG monitoring",
      "18-day battery life",
      "Always-on display",
      "Water resistant (50m)",
    ],
    colors: [
      { name: "Graphite", value: "#4B5563" },
      { name: "Silver", value: "#E5E7EB" },
      { name: "Gold", value: "#FBBF24" },
    ],
    specs: {
      Display: '1.4" AMOLED',
      Resolution: "454 × 454 pixels",
      Sensors: "Heart rate, SpO2, Gyroscope",
      Battery: "18 days typical use",
      "Water Resistance": "5 ATM",
    },
    relatedProducts: ["headphones-pro", "earbuds-wireless", "speaker-portable"],
  },
  {
    id: "tablet-pro",
    name: "TechPro Tablet",
    description:
      "Ultra-thin tablet with stunning display and powerful performance for work and entertainment.",
    price: 799.99,
    category: "Computing",
    image:
      "https://images.unsplash.com/photo-1527698266440-12104e498b76?q=80&w=1000&auto=format&fit=crop",
    features: [
      '11" Liquid Retina display',
      "All-day battery life",
      "Powerful performance",
      "Face ID security",
      "Apple Pencil compatible",
    ],
    colors: [
      { name: "Space Gray", value: "#1F2937" },
      { name: "Silver", value: "#E5E7EB" },
    ],
    specs: {
      Display: '11" Liquid Retina',
      Processor: "M2 chip",
      Storage: "128GB/256GB/512GB/1TB",
      Battery: "Up to 10 hours",
      Weight: "466g",
    },
    relatedProducts: ["headphones-pro", "earbuds-wireless", "smartwatch"],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getRelatedProducts = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];

  return product.relatedProducts
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};
