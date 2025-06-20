import { ExternalLink } from 'lucide-react';
import elemaru from '../assets/elemaru.png';

interface HeaderProps {
  isScrolled: boolean;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ isScrolled, menuOpen, setMenuOpen }: HeaderProps) {
  return (
    <header className={`py-4 px-6 flex justify-between items-center fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#46AA65] text-white' : 'bg-white text-[#46AA65]'}`}>
      <div className="flex items-center space-x-2 md:space-x-4">
        <img src={elemaru} alt="えれ丸" className="h-8 w-8 md:h-12 md:w-12 object-contain" />
        <h1 className="text-base md:text-xl font-bold">PHPカンファレンス関西2025</h1>
      </div>
      <div className="hidden md:flex space-x-4">
        <a href="https://fortee.jp/phpcon-kansai2025/timetable/" target="_blank" rel="noopener noreferrer" className={`text-sm font-bold ${isScrolled ? 'text-white' : 'text-[#46AA65]'}`}>タイムテーブル</a>
        <a href="https://note.com/phpcon_kansai" target="_blank" rel="noopener noreferrer" className={`text-sm font-bold ${isScrolled ? 'text-white' : 'text-[#46AA65]'}`}>note</a>
        <a href="https://fortee.jp/phpcon-kansai2025/ticket-shop/index" target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-[#FFC145] text-white font-bold px-4 py-1 rounded-full hover:bg-opacity-90 transition">
          <ExternalLink className="w-4 h-4 mr-2" />チケット購入
        </a>
      </div>
      <div className="md:hidden relative">
        <button className={`focus:outline-none ${isScrolled ? 'text-white' : 'text-[#46AA65]'}`} onClick={() => setMenuOpen(!menuOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
            <a href="https://fortee.jp/phpcon-kansai2025/timetable/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100">タイムテーブル</a>
            <a href="https://note.com/phpcon_kansai" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100">note</a>
            <a href="https://fortee.jp/phpcon-kansai2025/ticket-shop/index" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100">チケット購入</a>
          </div>
        )}
      </div>
    </header>
  );
}
