import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Travel Unbounded | Experiential Travel Experts',
  description: "India's most trusted experiential travel experts. Discover curated journeys built around people, culture, and authentic experiences.",
  keywords: ['Travel Unbounded', 'Experiential Travel', 'Kerala Backwaters', 'Masai Mara Safari', 'Tailor Made Tours', 'India Packages', 'International Tours'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
