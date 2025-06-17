import elemaru from '../assets/elemaru.png';
import XIcon from '../assets/x.svg';
import noteIcon from '../assets/note.svg';

export default function Footer() {
  return (
    <div>
        <footer className="bg-[#46AA65] text-white py-12">
            <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col items-center mb-8">
                <img src={elemaru} alt="えれ丸" className="h-20 w-20 mb-4 object-contain" />
                <h2 className="text-2xl font-bold">PHPカンファレンス関西2025</h2>
            </div>
            <div className="flex justify-center space-x-4 mb-8">
                <a
                href="https://x.com/phpcon_kansai"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-all duration-300 hover:scale-110"
                >
                <img src={XIcon} alt="X" className="w-6 h-6" />
                </a>
                <a
                href="https://note.com/phpcon_kansai"
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition-all duration-300 hover:scale-110"
                >
                <img src={noteIcon} alt="Note" className="w-6 h-6" />
                </a>
            </div>
            <div className="text-center m-4 space-x-4">
                <a
                href="https://2015.kphpug.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm hover:underline"
                >
                2015
                </a>
                <a
                href="https://2016.kphpug.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm hover:underline"
                >
                2016
                </a>
                <a
                href="https://2017.kphpug.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm hover:underline"
                >
                2017
                </a>
                <a
                href="https://2018.kphpug.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm hover:underline"
                >
                2018
                </a>
                <a
                href="https://2024.kphpug.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm hover:underline"
                >
                2024
                </a>
            </div>
            <div className="text-center">
                <p className="mb-2">PHPカンファレンス関西2025実行委員会</p>
                <p>Copyright © Kansai PHP Users Group</p>
            </div>
            </div>
        </footer>

        <style>{`
        @keyframes float {
            0%, 100% {
            transform: translateY(0);
            }
            50% {
            transform: translateY(-20px);
            }
        }
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
        `}</style>
    </div>
  );
}
