import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Ruler, TrendingUp, User } from 'lucide-react';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SizeFinderProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  onSizeSelected: (size: string) => void;
}

export function SizeFinder({
  isOpen,
  onClose,
  productName,
  onSizeSelected,
}: SizeFinderProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);

  const handleFindSize = () => {
    const heightNum = parseInt(height);
    const weightNum = parseInt(weight);

    if (heightNum && weightNum) {
      // Simple size recommendation logic
      if (heightNum < 160 && weightNum < 60) {
        setRecommendedSize('S');
      } else if (heightNum < 170 && weightNum < 70) {
        setRecommendedSize('M');
      } else if (heightNum < 180 && weightNum < 85) {
        setRecommendedSize('L');
      } else {
        setRecommendedSize('XL');
      }
    }
  };

  const handleSelectSize = () => {
    if (recommendedSize) {
      onSizeSelected(recommendedSize);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" aria-describedby="size-finder-description">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ruler className="w-5 h-5" />
            Smart Size Finder
          </DialogTitle>
          <p id="size-finder-description" className="sr-only">
            Find your perfect size based on your measurements
          </p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="text-sm text-gray-600">
              Find your perfect size for <strong>{productName}</strong>
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="65"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bodyType">Body Type (Optional)</Label>
              <Select value={bodyType} onValueChange={setBodyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select body type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slim">Slim</SelectItem>
                  <SelectItem value="athletic">Athletic</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="broad">Broad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleFindSize}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              disabled={!height || !weight}
            >
              Find My Size
            </Button>
          </div>

          {recommendedSize && (
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-2">
                <User className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Recommended Size</p>
                <p className="text-4xl text-green-700">{recommendedSize}</p>
              </div>
              <p className="text-xs text-gray-500">
                Based on your measurements, we recommend size {recommendedSize} for the
                best fit
              </p>
              <Button
                onClick={handleSelectSize}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Select Size {recommendedSize}
              </Button>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm mb-2">Size Chart</h4>
            <div className="text-xs space-y-1 text-gray-600">
              <div className="flex justify-between">
                <span>S (Small)</span>
                <span>Height: 150-160cm, Weight: 45-60kg</span>
              </div>
              <div className="flex justify-between">
                <span>M (Medium)</span>
                <span>Height: 160-170cm, Weight: 60-70kg</span>
              </div>
              <div className="flex justify-between">
                <span>L (Large)</span>
                <span>Height: 170-180cm, Weight: 70-85kg</span>
              </div>
              <div className="flex justify-between">
                <span>XL (Extra Large)</span>
                <span>Height: 180+cm, Weight: 85+kg</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}