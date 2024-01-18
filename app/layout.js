import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Next Market',
  description: 'Next Appフォルダを使用したフリマサンプルアプリ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
