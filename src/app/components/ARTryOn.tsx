import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Camera, X, RotateCcw, Download, Share2, Maximize } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner';

interface ARTryOnProps {
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
  productName: string;
}

export function ARTryOn({
  isOpen,
  onClose,
  productImage,
  productName,
}: ARTryOnProps) {
  const [step, setStep] = useState<'permission' | 'camera' | 'preview'>('permission');
  const [cameraGranted, setCameraGranted] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [opacity, setOpacity] = useState(70);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

 useEffect(() => {
  return () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };
}, []);

 const handleRequestPermission = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
    });

    setCameraGranted(true);
    setStep('camera');

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }

    toast.success('Camera permission granted!');
  } catch (error) {
    console.error(error);
    toast.error('Camera access denied');
  }
};

  const handleCapture = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Flip the canvas horizontally to match the mirrored video
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        ctx.restore();
        
        // Draw the product overlay on top
        const productImg = new Image();
        productImg.crossOrigin = 'anonymous';
        productImg.src = productImage;
        
        productImg.onload = () => {
          // Calculate centered position for product overlay
          const overlayWidth = canvas.width * 0.5;
          const overlayHeight = (productImg.height / productImg.width) * overlayWidth;
          const x = (canvas.width - overlayWidth) / 2;
          const y = (canvas.height - overlayHeight) / 2;
          
          // Apply opacity
          ctx.globalAlpha = opacity / 100;
          ctx.drawImage(productImg, x, y, overlayWidth, overlayHeight);
          ctx.globalAlpha = 1;
          
          const imageData = canvas.toDataURL('image/png');
          setCapturedImage(imageData);
          setStep('preview');
          toast.success('Photo captured!');
        };
        
        productImg.onerror = () => {
          // Fallback if image doesn't load
          const imageData = canvas.toDataURL('image/png');
          setCapturedImage(imageData);
          setStep('preview');
          toast.success('Photo captured!');
        };
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setStep('camera');
  };

  const handleDownload = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = `fashion-shake-tryon-${Date.now()}.png`;
      link.click();
      toast.success('Image downloaded!');
    }
  };

  const handleShare = () => {
    toast.success('Sharing options opened!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0" aria-describedby="ar-tryon-description">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            AR Virtual Try-On - {productName}
          </DialogTitle>
          <p id="ar-tryon-description" className="sr-only">
            Use augmented reality to try on {productName} virtually using your camera
          </p>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Permission Step */}
          {step === 'permission' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl mb-3">Camera Access Required</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                To use AR Try-On, we need access to your camera. This allows you to see
                how the {productName} looks on you in real-time.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <p className="text-sm text-blue-800">
                  <strong>Privacy Note:</strong> Your camera feed is processed locally on
                  your device. We don't store or transmit any images without your
                  permission.
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button onClick={onClose} variant="outline">
                  Cancel
                </Button>
                <Button
                  onClick={handleRequestPermission}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Allow Camera Access
                </Button>
              </div>
            </div>
          )}

          {/* Camera View Step */}
          {step === 'camera' && (
            <div className="space-y-4">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-[4/3]">
                {/* Live Camera Feed */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                />

                {/* AR Overlay - Product Image */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ opacity: opacity / 100 }}
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={productImage}
                      alt={productName}
                      className="max-w-xs max-h-96 object-contain drop-shadow-2xl"
                    />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {productName}
                    </div>
                  </div>
                </div>

                {/* Guide Frame */}
                <div className="absolute inset-0 border-4 border-purple-500/30 rounded-lg m-8">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-purple-500"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-purple-500"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-purple-500"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-purple-500"></div>
                </div>

                {/* Instructions */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                  Position yourself in the frame and see how the outfit looks!
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-sm whitespace-nowrap">
                    Outfit Opacity:
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={opacity}
                    onChange={(e) => setOpacity(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm text-gray-600 w-12">{opacity}%</span>
                </div>

                <div className="flex gap-3">
                  <Button onClick={onClose} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCapture}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Photo
                  </Button>
                </div>
              </div>

              {/* Hidden canvas for capture */}
              <canvas ref={canvasRef} className="hidden" />
            </div>
          )}

          {/* Preview Step */}
          {step === 'preview' && capturedImage && (
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={capturedImage}
                  alt="Captured preview"
                  className="w-full h-auto"
                />
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 mb-2">
                  ✨ Looking great! The {productName} suits you perfectly!
                </p>
                <p className="text-sm text-gray-600">
                  Ready to add this to your cart?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button onClick={handleRetake} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake
                </Button>
                <Button onClick={handleDownload} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button onClick={handleShare} variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}