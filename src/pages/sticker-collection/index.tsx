import { Link } from "react-router-dom";
import elemaru from '../../assets/elemaru.png';
import noteIcon from '../../assets/note.svg';
import XIcon from '../../assets/x.svg';

export default function StickerCollection() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center bg-[#46AA65] text-white fixed w-full z-50">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={elemaru} alt="えれ丸" className="h-8 w-8 md:h-12 md:w-12 object-contain" />
            <h1 className="text-base md:text-xl font-bold">PHPカンファレンス関西2025</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#46AA65] text-center">
            🎯 PHPerシール交換企画
          </h1>
          <p className="text-center text-lg">
            あなたのXアイコンがオリジナルシールに！<br />
            参加者同士でシール交換してPHPerフレンズを作ろう！
          </p>

          <section className="bg-gray-100 p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-bold text-[#46AA65]">📋 参加方法</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              <li>
                <strong>受付：</strong>207番（入場受付と同じ場所）で
                <span className="font-bold text-[#46AA65]">15:10から開始</span>
              </li>
              <li>参加者同士でPHPerシールを交換しよう！</li>
              <li>シール6枚集めるごとに抽選券1枚ゲット！</li>
            </ul>
          </section>

          <section className="bg-green-50 border-l-4 border-[#46AA65] p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-bold text-[#46AA65]">🎁 抽選ルール</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              <li>集めたシール枚数に応じて最大5回まで抽選可能</li>
              <li>
                <strong>スポンサーシール</strong>は
                <span className="text-[#46AA65] font-bold">2枚分</span>としてカウント（スポンサーブースへGO！）
              </li>
              <li>受付でシールと台紙を見せて抽選券をもらおう</li>
            </ul>
            <p className="text-red-600 font-bold mt-4">
              ※景品はなくなり次第終了となります
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
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