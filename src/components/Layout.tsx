import { ReactNode, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
