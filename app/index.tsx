import { useEffect } from 'react';
import * as SplashScreen from "expo-splash-screen";
import { getToken } from '@/api'; // Make sure this imports the correct getToken function
import { router } from 'expo-router';

// Prevent the splash screen from hiding automatically
SplashScreen.preventAutoHideAsync();

const Middleware = () => { // Fix the typo here (Middlerwaqre -> Middleware)
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getToken();
        if (token) {
          // If token exists, navigate to the main screen
          router.replace('/(main)/(tabs)');
        } else {
          // If no token, navigate to the auth screen
          router.replace('/authScreen');
        }
      } catch (error) {
        console.error("Error checking token:", error);
        // If error, navigate to the auth screen
        router.replace('/authScreen');
      } finally {
        // Hide the splash screen once the token check is done
        await SplashScreen.hideAsync();
      }
    };

    checkToken();
  }, []); // Empty dependency array ensures this effect runs once on mount

  return null; // This component doesn’t render anything to the screen
};

export default Middleware;
