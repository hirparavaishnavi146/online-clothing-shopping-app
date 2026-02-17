import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Recycle, Upload, DollarSign, CheckCircle, Package } from 'lucide-react';
import { useState } from 'react';

interface BuyBackProgramProps {
  isOpen: boolean;
  onClose: () => void;
  onCreditsAdded?: (credits: number) => void;
}

export function BuyBackProgram({ isOpen, onClose, onCreditsAdded }: BuyBackProgramProps) {
  const [step, setStep] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState('');
  const [description, setDescription] = useState('');
  const [calculatedCredit, setCalculatedCredit] = useState(0);

  const PRICE_PER_ITEM = 10; // ₹10 per old clothing item

  const handleCalculate = () => {
    const items = parseInt(numberOfItems);
    if (items > 0) {
      const credit = items * PRICE_PER_ITEM;
      setCalculatedCredit(credit);
      setStep(2);
    }
  };

  const handleSubmit = () => {
    // Add credits to localStorage
    const currentCredits = parseFloat(localStorage.getItem('buybackCredits') || '0');
    const newCredits = currentCredits + calculatedCredit;
    localStorage.setItem('buybackCredits', newCredits.toString());
    
    // Notify parent component
    if (onCreditsAdded) {
      onCreditsAdded(calculatedCredit);
    }
    
    setStep(3);
  };

  const handleClose = () => {
    setStep(1);
    setNumberOfItems('');
    setDescription('');
    setCalculatedCredit(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl" aria-describedby="buyback-description">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Recycle className="w-5 h-5" />
            Buy-Back Program - Sell Your Old Clothes
          </DialogTitle>
          <p id="buyback-description" className="sr-only">
            Sell your old clothes back to us for store credit
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {step === 1 && (
            <>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 text-center">
                <Package className="w-12 h-12 mx-auto mb-3 text-green-700" />
                <h3 className="text-xl mb-2">Turn Old Clothes into Shopping Credit</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Get ₹10 per piece of clothing you send back to us
                </p>
                <div className="bg-white rounded-lg p-4 inline-block">
                  <p className="text-3xl text-green-600 mb-1">₹10</p>
                  <p className="text-xs text-gray-500">per clothing item</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="numberOfItems">How many clothing items do you want to sell?</Label>
                  <Input
                    id="numberOfItems"
                    type="number"
                    placeholder="e.g., 5"
                    value={numberOfItems}
                    onChange={(e) => setNumberOfItems(e.target.value)}
                    min="1"
                  />
                  <p className="text-xs text-gray-500">
                    Any type of clothing: shirts, pants, dresses, jackets, etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Additional Details (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the items you're sending (optional)..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="border-2 border-dashed rounded-lg p-6 text-center bg-gray-50">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload photos of your items (Optional)
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    This helps us verify your items faster
                  </p>
                  <Button variant="outline" size="sm">
                    Choose Files
                  </Button>
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-sm mb-2">How it works:</h4>
                <ol className="text-sm text-gray-600 space-y-1 ml-4 list-decimal">
                  <li>Tell us how many items you have</li>
                  <li>We'll send you a free shipping label</li>
                  <li>Pack and ship your items to us</li>
                  <li>Get ₹10 credit per item added to your account</li>
                  <li>Use credits on your next purchase!</li>
                </ol>
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                disabled={!numberOfItems || parseInt(numberOfItems) <= 0}
              >
                Calculate My Credits
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-8 text-center">
                <DollarSign className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <p className="text-sm text-gray-600 mb-2">You will receive</p>
                <p className="text-5xl mb-2 text-purple-600">
                  ₹{calculatedCredit}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {numberOfItems} items × ₹{PRICE_PER_ITEM} per item
                </p>
                <div className="bg-white rounded-lg p-3 inline-block">
                  <p className="text-xs text-gray-600">
                    These credits can be used on any purchase!
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-purple-600">1</span>
                  </div>
                  <div>
                    <p className="text-sm mb-1">Ship Your Items</p>
                    <p className="text-xs text-gray-600">
                      We'll email you a free shipping label within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-purple-600">2</span>
                  </div>
                  <div>
                    <p className="text-sm mb-1">We Receive & Verify</p>
                    <p className="text-xs text-gray-600">
                      Our team counts and verifies your items
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-purple-600">3</span>
                  </div>
                  <div>
                    <p className="text-sm mb-1">Get Your Credits</p>
                    <p className="text-xs text-gray-600">
                      Credits added instantly to your account
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  ♻️ By participating in our buy-back program, you're helping reduce fashion waste and supporting sustainability!
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  Submit Request
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl mb-2">Request Submitted Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  We've received your buy-back request for {numberOfItems} items.
                </p>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 mb-6">
                  <p className="text-sm mb-2 text-gray-600">Pending Credits</p>
                  <p className="text-4xl text-purple-600 mb-2">
                    ₹{calculatedCredit}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Will be added after we receive your items
                  </p>
                  
                  <div className="bg-white rounded-lg p-3 mb-4">
                    <p className="text-sm mb-1">Reference Number</p>
                    <p className="text-xl tracking-wider text-purple-600">
                      BB-{Math.floor(Math.random() * 100000)}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600">
                    For demo purposes, ₹{calculatedCredit} has been added to your account instantly!
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-700 mb-2">
                    ✓ Shipping label will be sent to your email
                  </p>
                  <p className="text-sm text-green-700">
                    ✓ Credits can be used immediately on your next purchase
                  </p>
                </div>

                <Button
                  onClick={handleClose}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Start Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}