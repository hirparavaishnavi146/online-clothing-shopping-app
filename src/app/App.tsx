import { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginPage } from './components/LoginPage';
import { ShoppingPage } from './components/ShoppingPage';
import { Toaster } from './components/ui/sonner';

type AppScreen = 'splash' | 'login' | 'shop';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');

  const handleSplashComplete = () => {
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setCurrentScreen('shop');
  };

  return (
    <>
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
      {currentScreen === 'login' && <LoginPage onLogin={handleLogin} />}
      {currentScreen === 'shop' && <ShoppingPage />}
      <Toaster />
    </>
  );
}