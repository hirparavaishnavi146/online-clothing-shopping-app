import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingCart, Trash2, Plus, Minus, Tag, Recycle } from 'lucide-react';
import { Input } from './ui/input';
import { useState } from 'react';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  buybackCredits?: number;
  onBuybackCreditsUsed?: (creditsUsed: number) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  buybackCredits = 0,
  onBuybackCreditsUsed,
}: CartDrawerProps) {
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{
    code: string;
    percentage: number;
  } | null>(null);
  const [useBuybackCredits, setUseBuybackCredits] = useState(false);

  const validCodes: Record<string, number> = {
    PARTY20: 20,
    SNEAKER15: 15,
    ECO25: 25,
    FASHION10: 10,
  };

  const handleApplyDiscount = () => {
    const upperCode = discountCode.toUpperCase();
    if (validCodes[upperCode]) {
      setAppliedDiscount({ code: upperCode, percentage: validCodes[upperCode] });
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedDiscount
    ? (subtotal * appliedDiscount.percentage) / 100
    : 0;
  
  // Calculate buyback credits discount
  const buybackDiscount = useBuybackCredits ? Math.min(buybackCredits, subtotal - discount) : 0;
  const total = subtotal - discount - buybackDiscount;

  const handleCheckout = () => {
    // If buyback credits were used, update the remaining credits
    if (useBuybackCredits && buybackDiscount > 0 && onBuybackCreditsUsed) {
      onBuybackCreditsUsed(buybackDiscount);
    }
    onCheckout();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" aria-describedby="cart-description">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Shopping Cart ({items.length} items)
          </DialogTitle>
          <p id="cart-description" className="sr-only">
            View and manage items in your shopping cart
          </p>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 bg-gray-50 rounded-lg p-4"
                >
                  <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm mb-1">{item.name}</h3>
                    {item.size && (
                      <p className="text-xs text-gray-500 mb-2">Size: {item.size}</p>
                    )}
                    <p className="text-lg text-purple-600 mb-2">₹{item.price}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() =>
                          onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                    <p className="text-lg">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Buyback Credits Section */}
              {buybackCredits > 0 && (
                <div className="border-t pt-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Recycle className="w-5 h-5 text-green-700" />
                        <div>
                          <p className="text-sm">Buyback Credits Available</p>
                          <p className="text-xs text-gray-600">From selling old clothes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl text-green-700">₹{buybackCredits.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between bg-white rounded-lg p-3">
                      <Label htmlFor="use-credits" className="text-sm cursor-pointer">
                        Use buyback credits on this order
                      </Label>
                      <Switch
                        id="use-credits"
                        checked={useBuybackCredits}
                        onCheckedChange={setUseBuybackCredits}
                      />
                    </div>
                    {useBuybackCredits && (
                      <p className="text-xs text-green-700 mt-2">
                        ✓ Applying ₹{buybackDiscount.toFixed(2)} from your buyback credits
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Discount Code */}
              <div className="border-t pt-4">
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Enter discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleApplyDiscount}
                    variant="outline"
                    className="shrink-0"
                  >
                    <Tag className="w-4 h-4 mr-2" />
                    Apply
                  </Button>
                </div>

                {appliedDiscount && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-green-700">
                      ✓ Code "{appliedDiscount.code}" applied! {appliedDiscount.percentage}
                      % discount
                    </p>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({appliedDiscount.percentage}%)</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                {useBuybackCredits && buybackDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span className="flex items-center gap-1">
                      <Recycle className="w-3 h-3" />
                      Buyback Credits
                    </span>
                    <span>-₹{buybackDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-purple-600">₹{total.toFixed(2)}</span>
                </div>
                {useBuybackCredits && buybackDiscount > 0 && (
                  <p className="text-xs text-gray-500">
                    Remaining credits after purchase: ₹{(buybackCredits - buybackDiscount).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Continue Shopping
            </Button>
            <Button
              onClick={handleCheckout}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}