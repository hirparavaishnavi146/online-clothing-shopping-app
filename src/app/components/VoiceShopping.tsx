import { Button } from './ui/button';
import { Mic, MicOff, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface VoiceShoppingProps {
  onSearch: (query: string) => void;
}

export function VoiceShopping({ onSearch }: VoiceShoppingProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);

  useEffect(() => {
    if (isListening) {
      // Simulate voice recognition with realistic examples
      const examples = [
        'Show me black party dresses under ₹2000',
        'Find blue denim jeans for men',
        'Show sustainable winter jackets',
        'Looking for white sneakers',
        'Black dress',
        'Casual hoodie',
        'Eco friendly clothes',
      ];
      const randomExample = examples[Math.floor(Math.random() * examples.length)];
      
      setTimeout(() => {
        setTranscript(randomExample);
        setIsListening(false);
        onSearch(randomExample);
        
        // Auto-clear transcript after a few seconds
        setTimeout(() => setTranscript(''), 3000);
      }, 2000);
    }
  }, [isListening, onSearch]);

  const handleToggleListening = () => {
    if (!isListening) {
      setTranscript('');
      setShowSuggestion(false);
    }
    setIsListening(!isListening);
  };

  return (
    <div className="relative">
      <Button
        onClick={handleToggleListening}
        variant={isListening ? 'default' : 'outline'}
        size="icon"
        className={
          isListening
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 animate-pulse'
            : ''
        }
        onMouseEnter={() => !isListening && setShowSuggestion(true)}
        onMouseLeave={() => setShowSuggestion(false)}
      >
        {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
      </Button>

      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl p-4 w-72 z-50"
          >
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Mic className="w-5 h-5 text-purple-600" />
              </motion.div>
              <p className="text-sm">Listening...</p>
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-purple-600 to-pink-600 rounded-full"
                  animate={{
                    height: [8, 24, 8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Try: "Show me black party dresses under ₹2000"
            </p>
          </motion.div>
        )}

        {transcript && !isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute top-full right-0 mt-2 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg shadow-lg p-3 w-72 z-50"
          >
            <div className="flex items-start gap-2">
              <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">You said:</p>
                <p className="text-sm">{transcript}</p>
              </div>
            </div>
          </motion.div>
        )}

        {showSuggestion && !isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 bg-gray-900 text-white rounded-lg shadow-lg p-2 w-48 z-50 text-xs"
          >
            🎤 Click to use voice search!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}