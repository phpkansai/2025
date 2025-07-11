import { ReactNode, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

interface NonHomeLayoutProps {
  children: ReactNode;
}

export default function NonHomeLayout({ children }: NonHomeLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white flex flex-col">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}