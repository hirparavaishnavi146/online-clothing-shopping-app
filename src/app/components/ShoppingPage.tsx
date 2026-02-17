import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Heart,
  Search,
  User,
  Menu,
  Filter,
  Star,
  ShoppingCart,
  Leaf,
  Camera,
  Users,
  Gift,
  TrendingUp,
  Recycle,
  Sparkles,
} from 'lucide-react';
import { Chatbot } from './Chatbot';
import { ARTryOn } from './ARTryOn';
import { TreasureHunt } from './TreasureHunt';
import { FriendReview } from './FriendReview';
import { VoiceShopping } from './VoiceShopping';
import { CartDrawer } from './CartDrawer';
import { SizeFinder } from './SizeFinder';
import { BuyBackProgram } from './BuyBackProgram';
import { ProductDetail } from './ProductDetail';
import { FashionShakeLogo } from './FashionShakeLogo';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  discount?: string;
  isEco?: boolean;
  isTreasure?: boolean;
  treasureCode?: string;
  treasureDiscount?: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Classic Denim Shirt',
    price: 1499.99,
    originalPrice: 2299.99,
    image: 'https://images.unsplash.com/photo-1657405592096-0eb9199a8634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW4lMjBjYXN1YWwlMjBzaGlydHxlbnwxfHx8fDE3NzA0NTM5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Men',
    rating: 4.5,
    discount: '35% OFF',
    isEco: true,
  },
  {
    id: 2,
    name: 'Elegant Black Party Dress',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1761164920960-2d776a18998c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJ0eSUyMGRyZXNzJTIwYmxhY2slMjBlbGVnYW50fGVufDF8fHx8MTc3MDQ4NTM1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Women',
    rating: 4.8,
    isNew: true,
    isTreasure: true,
    treasureCode: 'PARTY20',
    treasureDiscount: '20% OFF',
  },
  {
    id: 3,
    name: 'Premium Denim Jeans',
    price: 1999.99,
    originalPrice: 2899.99,
    image: 'https://images.unsplash.com/photo-1658910453954-6ca847bb7470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5pbSUyMGplYW5zfGVufDF8fHx8MTc3MDQxNDQ0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Men',
    rating: 4.6,
    discount: '30% OFF',
    isEco: true,
  },
  {
    id: 4,
    name: 'Sustainable Blazer',
    price: 3999.99,
    image: 'https://images.unsplash.com/photo-1758534063951-1c78600f8129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBibGF6ZXIlMjBzdWl0fGVufDF8fHx8MTc3MDQ4NTM1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Formal',
    rating: 4.9,
    isNew: true,
    isEco: true,
  },
  {
    id: 5,
    name: 'Sport Sneakers White',
    price: 2499.99,
    originalPrice: 3199.99,
    image: 'https://images.unsplash.com/photo-1656944227480-98180d2a5155?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmVha2VycyUyMHNob2VzfGVufDF8fHx8MTc3MDQ2Nzg0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Shoes',
    rating: 4.7,
    discount: '20% OFF',
    isTreasure: true,
    treasureCode: 'SNEAKER15',
    treasureDiscount: '15% OFF',
  },
  {
    id: 6,
    name: 'Casual Hoodie',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1764069414793-c255766e3e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzdHJlZXR3ZWFyJTIwaG9vZGllfGVufDF8fHx8MTc3MDQ4NTM1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Casual',
    rating: 4.4,
    isEco: true,
  },
  {
    id: 7,
    name: 'Summer Floral Dress',
    price: 1699.99,
    image: 'https://images.unsplash.com/photo-1721990336298-90832e791b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGRyZXNzJTIwZmFzaGlvbnxlbnwxfHx8fDE3NzA0NDU5NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Women',
    rating: 4.8,
    isEco: true,
  },
  {
    id: 8,
    name: 'Eco Collection Tee',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1749813991859-8953e5b4dd26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGNsb3RoaW5nfGVufDF8fHx8MTc3MDQ4NTM1MHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Casual',
    rating: 4.6,
    isEco: true,
    isTreasure: true,
    treasureCode: 'ECO25',
    treasureDiscount: '25% OFF',
  },
  {
    id: 9,
    name: 'Leather Jacket Brown',
    price: 5499.99,
    originalPrice: 7999.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwamFja2V0fGVufDF8fHx8MTczOTAyNTQ4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Men',
    rating: 4.9,
    discount: '30% OFF',
    isNew: true,
  },
  {
    id: 10,
    name: 'Running Shoes Blue',
    price: 3299.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXN8ZW58MXx8fHwxNzM5MDI1NDgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Shoes',
    rating: 4.7,
    isNew: true,
  },
  {
    id: 11,
    name: 'Formal White Shirt',
    price: 1799.99,
    originalPrice: 2499.99,
    image: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JtYWwlMjBzaGlydCUyMHdoaXRlfGVufDF8fHx8MTczOTAyNTQ4MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Formal',
    rating: 4.5,
    discount: '28% OFF',
  },
  {
    id: 12,
    name: 'Yoga Pants Black',
    price: 1199.99,
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwcGFudHN8ZW58MXx8fHwxNzM5MDI1NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Women',
    rating: 4.6,
    isEco: true,
  },
  {
    id: 13,
    name: 'Bomber Jacket Green',
    price: 3499.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib21iZXIlMjBqYWNrZXR8ZW58MXx8fHwxNzM5MDI1NDgyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Casual',
    rating: 4.7,
    isNew: true,
  },
  {
    id: 14,
    name: 'Striped Polo Shirt',
    price: 999.99,
    originalPrice: 1599.99,
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xvJTIwc2hpcnR8ZW58MXx8fHwxNzM5MDI1NDgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Men',
    rating: 4.4,
    discount: '37% OFF',
  },
  {
    id: 15,
    name: 'Maxi Dress Floral',
    price: 2199.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXhpJTIwZHJlc3N8ZW58MXx8fHwxNzM5MDI1NDgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Women',
    rating: 4.9,
    isEco: true,
    isTreasure: true,
    treasureCode: 'FASHION10',
    treasureDiscount: '10% OFF',
  },
  {
    id: 16,
    name: 'Winter Parka Navy',
    price: 6999.99,
    originalPrice: 9999.99,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBwYXJrYXxlbnwxfHx8fDE3MzkwMjU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Men',
    rating: 4.8,
    discount: '30% OFF',
  },
  {
    id: 17,
    name: 'Slim Fit Chinos Beige',
    price: 1699.99,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlub3MlMjBwYW50c3xlbnwxfHx8fDE3MzkwMjU0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Men',
    rating: 4.5,
  },
  {
    id: 18,
    name: 'Sports Bra Pink',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1518310952931-b1de897abd40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBicmF8ZW58MXx8fHwxNzM5MDI1NDg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Women',
    rating: 4.6,
  },
  {
    id: 19,
    name: 'Canvas Sneakers Black',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW52YXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3MzkwMjU0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Shoes',
    rating: 4.5,
    isEco: true,
  },
  {
    id: 20,
    name: 'Trench Coat Khaki',
    price: 5999.99,
    image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVuY2glMjBjb2F0fGVufDF8fHx8MTczOTAyNTQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Formal',
    rating: 4.9,
    isNew: true,
  },
  {
    id: 21,
    name: 'Graphic Tee White',
    price: 699.99,
    originalPrice: 999.99,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwdHNoaXJ0fGVufDF8fHx8MTczOTAyNTQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Casual',
    rating: 4.3,
    discount: '30% OFF',
  },
  {
    id: 22,
    name: 'Wrap Dress Red',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBkcmVzcyUyMHdvbWVufGVufDF8fHx8MTczOTAyNTQ4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Women',
    rating: 4.8,
  },
  {
    id: 23,
    name: 'High Top Sneakers',
    price: 2899.99,
    originalPrice: 3999.99,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWdoJTIwdG9wJTIwc25lYWtlcnN8ZW58MXx8fHwxNzM5MDI1NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Shoes',
    rating: 4.7,
    discount: '27% OFF',
  },
  {
    id: 24,
    name: 'Cardigan Sweater Grey',
    price: 1999.99,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkaWdhbiUyMHN3ZWF0ZXJ8ZW58MXx8fHwxNzM5MDI1NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Casual',
    rating: 4.6,
    isEco: true,
  },
  {
    id: 25,
    name: 'Suit Jacket Black',
    price: 4999.99,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHN1aXQlMjBqYWNrZXR8ZW58MXx8fHwxNzM5MDI1NDg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Formal',
    rating: 4.9,
  },
  {
    id: 26,
    name: 'Ripped Jeans Blue',
    price: 1899.99,
    originalPrice: 2699.99,
    image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXBwZWQlMjBqZWFuc3xlbnwxfHx8fDE3MzkwMjU0ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Men',
    rating: 4.5,
    discount: '29% OFF',
  },
  {
    id: 27,
    name: 'Midi Skirt Pleated',
    price: 1399.99,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGVhdGVkJTIwc2tpcnR8ZW58MXx8fHwxNzM5MDI1NDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Women',
    rating: 4.7,
  },
  {
    id: 28,
    name: 'Oxford Shoes Brown',
    price: 3499.99,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxveGZvcmQlMjBzaG9lc3xlbnwxfHx8fDE3MzkwMjU0OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Shoes',
    rating: 4.8,
    isNew: true,
  },
  {
    id: 29,
    name: 'Tank Top Athletic',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHRhbmslMjB0b3B8ZW58MXx8fHwxNzM5MDI1NDkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Casual',
    rating: 4.4,
    isEco: true,
  },
  {
    id: 30,
    name: 'Evening Gown Purple',
    price: 7999.99,
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVuaW5nJTIwZ293bnxlbnwxfHx8fDE3MzkwMjU0OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Formal',
    rating: 5.0,
    isNew: true,
  },
];

const categories = ['All', 'Men', 'Women', 'Shoes', 'Formal', 'Casual'];

export function ShoppingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showARTryOn, setShowARTryOn] = useState(false);
  const [showTreasureHunt, setShowTreasureHunt] = useState(false);
  const [showFriendReview, setShowFriendReview] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSizeFinder, setShowSizeFinder] = useState(false);
  const [showBuyBack, setShowBuyBack] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [treasureFound, setTreasureFound] = useState<{
    code: string;
    discount: string;
  } | null>(null);
  const [currentTab, setCurrentTab] = useState('shop');
  const [buybackCredits, setBuybackCredits] = useState(0);

  // Load buyback credits from localStorage on mount
  useEffect(() => {
    const savedCredits = parseFloat(localStorage.getItem('buybackCredits') || '0');
    setBuybackCredits(savedCredits);
  }, []);

  const handleCreditsAdded = (credits: number) => {
    setBuybackCredits((prev) => prev + credits);
    toast.success(`₹${credits} buyback credits added to your account!`, {
      description: 'Use them on your next purchase',
    });
  };

  const handleBuybackCreditsUsed = (creditsUsed: number) => {
    const newCredits = Math.max(0, buybackCredits - creditsUsed);
    setBuybackCredits(newCredits);
    localStorage.setItem('buybackCredits', newCredits.toString());
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id];
      
      toast.success(
        prev.includes(id) ? 'Removed from favorites' : 'Added to favorites!'
      );
      return newFavorites;
    });
  };

  const addToCart = (product: Product, size: string = 'M') => {
    const existingItem = cart.find((item) => item.id === product.id && item.size === size);
    
    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
          size,
        },
      ]);
    }
    
    toast.success(`${product.name} (Size ${size}) added to cart!`);
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    toast.success('Proceeding to checkout...');
    setShowCart(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    if (product.isTreasure && product.treasureCode && product.treasureDiscount) {
      setTreasureFound({
        code: product.treasureCode,
        discount: product.treasureDiscount,
      });
      setShowTreasureHunt(true);
    } else {
      setShowProductDetail(true);
    }
  };

  const handleVoiceSearch = (query: string) => {
    setSearchQuery(query);
    toast.success(`Searching for: ${query}`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesTab = true;
    if (currentTab === 'sustainable') {
      matchesTab = product.isEco === true;
    } else if (currentTab === 'trending') {
      matchesTab = product.isNew === true || product.rating >= 4.7;
    }
    
    return matchesCategory && matchesSearch && matchesTab;
  });

  const ecoProducts = products.filter((p) => p.isEco);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
              <div className="flex items-center gap-2">
                <FashionShakeLogo className="w-8 h-8" />
                <h1 className="text-xl tracking-wide bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  FASHION SHAKE
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <VoiceShopping onSearch={handleVoiceSearch} />
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setShowCart(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for products or try voice search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </div>
      </header>

      {/* Feature Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-6 text-sm overflow-x-auto">
            <button
              onClick={() => selectedProduct && setShowARTryOn(true)}
              className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
            >
              <Camera className="w-4 h-4" />
              <span>AR Try-On</span>
            </button>
            <button className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
              <Gift className="w-4 h-4" />
              <span>Treasure Hunt</span>
            </button>
            <button
              onClick={() => selectedProduct && setShowFriendReview(true)}
              className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
            >
              <Users className="w-4 h-4" />
              <span>Friend Reviews</span>
            </button>
            <button
              onClick={() => setShowBuyBack(true)}
              className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
            >
              <Leaf className="w-4 h-4" />
              <span>Eco-Friendly</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b sticky top-[120px] z-30">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="w-full justify-start border-b-0 bg-transparent h-auto p-0">
              <TabsTrigger
                value="shop"
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none"
              >
                Shop All
              </TabsTrigger>
              <TabsTrigger
                value="sustainable"
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none"
              >
                <Leaf className="w-4 h-4 mr-2" />
                Sustainable
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-none"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b sticky top-[168px] z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 py-3 overflow-x-auto">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Filter className="w-5 h-5" />
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? 'shrink-0 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    : 'shrink-0'
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg">
            {filteredProducts.length} Products
          </h2>
          {currentTab === 'sustainable' && (
            <Badge className="bg-green-600">
              <Leaf className="w-3 h-3 mr-1" />
              Eco-Friendly Collection
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="relative aspect-[3/4] bg-gray-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-green-600">NEW</Badge>
                  )}
                  {product.discount && (
                    <Badge className="bg-red-600">{product.discount}</Badge>
                  )}
                  {product.isEco && (
                    <Badge className="bg-green-700">
                      <Leaf className="w-3 h-3 mr-1" />
                      ECO
                    </Badge>
                  )}
                  {product.isTreasure && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse">
                      <Gift className="w-3 h-3 mr-1" />
                      TREASURE
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product.id);
                  }}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(product.id)
                        ? 'fill-red-500 text-red-500'
                        : ''
                    }`}
                  />
                </Button>
              </div>

              <div className="p-3">
                <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                <h3 className="text-sm mb-2 line-clamp-1">{product.name}</h3>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">{product.rating}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">₹{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setShowARTryOn(true);
                    }}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Camera className="w-3 h-3 mr-1" />
                    Try
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                      setShowFriendReview(true);
                    }}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Users className="w-3 h-3 mr-1" />
                    Ask
                  </Button>
                </div>

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mt-2"
                  size="sm"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability Section */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <Recycle className="w-12 h-12 mx-auto mb-3 text-green-700" />
            <h2 className="text-3xl mb-2">Shop Sustainably</h2>
            <p className="text-gray-600">
              Fashion that cares for the planet
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => setShowBuyBack(true)}
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Recycle className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-lg mb-2">Buy-Back Program</h3>
              <p className="text-sm text-gray-600 mb-3">
                Sell your old clothes back to us and get store credit
              </p>
              <span className="text-sm text-purple-600">Click to Start →</span>
            </button>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-lg mb-2">Eco-Friendly Brands</h3>
              <p className="text-sm text-gray-600">
                Partner with brands that prioritize sustainable materials
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-lg mb-2">Recycling & Upcycling</h3>
              <p className="text-sm text-gray-600">
                Tools to recycle or upcycle your old clothing items
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        buybackCredits={buybackCredits}
        onBuybackCreditsUsed={handleBuybackCreditsUsed}
      />

      {/* Product Detail */}
      {selectedProduct && (
        <ProductDetail
          isOpen={showProductDetail}
          onClose={() => setShowProductDetail(false)}
          product={selectedProduct}
          onAddToCart={(size) => {
            addToCart(selectedProduct, size);
            setShowProductDetail(false);
          }}
          onTryAR={() => {
            setShowProductDetail(false);
            setShowARTryOn(true);
          }}
          onFriendReview={() => {
            setShowProductDetail(false);
            setShowFriendReview(true);
          }}
          onSizeFinder={() => {
            setShowProductDetail(false);
            setShowSizeFinder(true);
          }}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={() => toggleFavorite(selectedProduct.id)}
        />
      )}

      {/* AR Try-On Modal */}
      {selectedProduct && (
        <ARTryOn
          isOpen={showARTryOn}
          onClose={() => setShowARTryOn(false)}
          productImage={selectedProduct.image}
          productName={selectedProduct.name}
        />
      )}

      {/* Size Finder */}
      {selectedProduct && (
        <SizeFinder
          isOpen={showSizeFinder}
          onClose={() => setShowSizeFinder(false)}
          productName={selectedProduct.name}
          onSizeSelected={(size) => {
            addToCart(selectedProduct, size);
            setShowSizeFinder(false);
          }}
        />
      )}

      {/* Treasure Hunt Modal */}
      {treasureFound && (
        <TreasureHunt
          isOpen={showTreasureHunt}
          onClose={() => {
            setShowTreasureHunt(false);
            setTreasureFound(null);
          }}
          discountCode={treasureFound.code}
          discountAmount={treasureFound.discount}
        />
      )}

      {/* Friend Review Modal */}
      {selectedProduct && (
        <FriendReview
          isOpen={showFriendReview}
          onClose={() => setShowFriendReview(false)}
          productImage={selectedProduct.image}
          productName={selectedProduct.name}
          productPrice={selectedProduct.price}
        />
      )}

      {/* Buy Back Program */}
      <BuyBackProgram
        isOpen={showBuyBack}
        onClose={() => setShowBuyBack(false)}
        onCreditsAdded={handleCreditsAdded}
      />
    </div>
  );
}