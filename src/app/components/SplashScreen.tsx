import { motion } from 'motion/react';
import { FashionShakeLogo } from './FashionShakeLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-600 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      onAnimationComplete={onComplete}
    >
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="relative"
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <FashionShakeLogo className="w-32 h-32 text-white" animated={true} />
        </motion.div>
        <motion.h1
          className="text-white text-5xl tracking-wider"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          FASHION SHAKE
        </motion.h1>
        <motion.p
          className="text-white/90 text-base tracking-wide"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Shop Smart. Shop Sustainable. Shop Social.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}