import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { LocationProvider } from '@/contexts/LocationContext';
import { SupportProvider } from '@/contexts/SupportContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Zaryah - Where Stories Meet Soul',
  description: 'Discover meaningful creations from passionate artisans who pour their heart into every piece.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LocationProvider>
            <SupportProvider>
              <CartProvider>
                <WishlistProvider>
                  <NotificationProvider>
                    {children}
                  </NotificationProvider>
                </WishlistProvider>
              </CartProvider>
            </SupportProvider>
          </LocationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}