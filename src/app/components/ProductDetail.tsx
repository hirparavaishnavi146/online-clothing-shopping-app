import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Star,
  Heart,
  Camera,
  Users,
  Ruler,
  ShoppingCart,
  Leaf,
  X,
} from 'lucide-react';
import { useState } from 'react';

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
}

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onAddToCart: (size: string) => void;
  onTryAR: () => void;
  onFriendReview: () => void;
  onSizeFinder: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function ProductDetail({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onTryAR,
  onFriendReview,
  onSizeFinder,
  isFavorite,
  onToggleFavorite,
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('M');
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const reviews = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing quality! Fits perfectly and looks exactly like the picture.',
      date: '2 days ago',
    },
    {
      name: 'Mike Chen',
      rating: 4,
      comment: 'Great product, but size runs a bit large. Highly recommend!',
      date: '1 week ago',
    },
    {
      name: 'Emma Wilson',
      rating: 5,
      comment: 'Love it! Eco-friendly and stylish. Will buy again!',
      date: '2 weeks ago',
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0" aria-describedby="product-detail-description">
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative bg-gray-100">
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white"
            >
              <X className="w-5 h-5" />
            </Button>
            <p id="product-detail-description" className="sr-only">
              Detailed information about {product.name} including price, sizes, and reviews
            </p>
            <ImageWithFallback
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover min-h-[400px]"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && <Badge className="bg-green-600">NEW</Badge>}
              {product.discount && (
                <Badge className="bg-red-600">{product.discount}</Badge>
              )}
              {product.isEco && (
                <Badge className="bg-green-700">
                  <Leaf className="w-3 h-3 mr-1" />
                  ECO
                </Badge>
              )}
            </div>
            <Button
              onClick={onToggleFavorite}
              variant="ghost"
              size="icon"
              className="absolute bottom-4 right-4 bg-white/80 hover:bg-white"
            >
              <Heart
                className={`w-6 h-6 ${
                  isFavorite ? 'fill-red-500 text-red-500' : ''
                }`}
              />
            </Button>
          </div>

          {/* Details Section */}
          <div className="p-6 space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">{product.category}</p>
              <h2 className="text-2xl mb-2">{product.name}</h2>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({reviews.length} reviews)
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl text-purple-600">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm">Select Size</Label>
                <Button
                  onClick={onSizeFinder}
                  variant="link"
                  size="sm"
                  className="text-purple-600 p-0 h-auto"
                >
                  <Ruler className="w-4 h-4 mr-1" />
                  Size Finder
                </Button>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    className={
                      selectedSize === size
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : ''
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                onClick={() => onAddToCart(selectedSize)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - {selectedSize}
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={onTryAR} variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  AR Try-On
                </Button>
                <Button onClick={onFriendReview} variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Ask Friends
                </Button>
              </div>
            </div>

            {/* Product Description */}
            <div className="border-t pt-4">
              <h3 className="text-sm mb-2">Product Details</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Premium quality fabric</li>
                <li>• Comfortable fit for all-day wear</li>
                <li>• Easy care - machine washable</li>
                {product.isEco && (
                  <li className="text-green-700">
                    • Made from sustainable materials
                  </li>
                )}
                <li>• Available in multiple sizes</li>
              </ul>
            </div>

            {/* Reviews */}
            <div className="border-t pt-4">
              <h3 className="text-sm mb-3">Customer Reviews</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {reviews.map((review, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-xs text-purple-600">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm">{review.name}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}