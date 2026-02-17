import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Gift, Sparkles, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

interface TreasureHuntProps {
  isOpen: boolean;
  onClose: () => void;
  discountCode: string;
  discountAmount: string;
}

export function TreasureHunt({
  isOpen,
  onClose,
  discountCode,
  discountAmount,
}: TreasureHuntProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" aria-describedby="treasure-hunt-description">
        <DialogHeader>
          <DialogTitle className="text-center">
            🎁 Fashion Treasure Hunt
          </DialogTitle>
          <p id="treasure-hunt-description" className="sr-only">
            Find hidden treasures on products to unlock discount codes
          </p>
        </DialogHeader>

        <div className="text-center space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
            <Sparkles className="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <h3 className="text-2xl mb-2">Congratulations!</h3>
            <p className="text-gray-600 mb-4">
              You've discovered a hidden discount code in our Fashion Treasure Hunt!
            </p>

            <div className="bg-white rounded-lg p-4 mb-4 border-2 border-dashed border-purple-300">
              <p className="text-sm text-gray-600 mb-2">Your Discount Code:</p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-2xl tracking-wider bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {discountCode}
                </code>
                <Button
                  onClick={handleCopy}
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-purple-600 mt-2">
                {discountAmount} on your purchase!
              </p>
            </div>

            <p className="text-xs text-gray-500">
              Apply this code at checkout to unlock your discount. Code valid for 24 hours.
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Continue Shopping
            </Button>
            <Button
              onClick={() => {
                handleCopy();
                setTimeout(onClose, 500);
              }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy & Close
            </Button>
          </div>

          <p className="text-xs text-gray-400">
            💎 Keep exploring to find more hidden treasures!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}