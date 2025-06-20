import { ExternalLink } from 'lucide-react';
import elemaru from '../assets/elemaru.png';

export default function Hero() {
  return (
    <div
        className="relative h-screen bg-[#46AA65] flex items-center justify-center text-white pt-16 md:pt-0"
        style={{
          backgroundImage: 'url(https://2018.kphpug.jp/assets/images/keyvisual.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#46AA65] opacity-70"></div>
        <div className="relative text-center space-y-4 md:space-y-6">
          <img src={elemaru} alt="えれ丸" className="mx-auto h-28 w-28 md:h-40 md:w-40 object-contain animate-float" />
          <h1 className="text-3xl md:text-5xl font-bold animate-slide-up">PHPカンファレンス関西2025</h1>
          <p className="text-2xl md:text-4xl animate-slide-up-delay-1">
            2025年
            <span className="font-bold text-3xl md:text-5xl">7</span>月
            <span className="font-bold text-3xl md:text-5xl">18</span>日(金)・
            <span className="font-bold text-3xl md:text-5xl">19</span>日(土)
          </p>
          <p className="text-base md:text-xl animate-slide-up-delay-2">神戸駅前研修センター</p>
          <div className="flex flex-col space-y-4 animate-slide-up-delay-3">
            <div>
              <a
                href="https://fortee.jp/phpcon-kansai2025/ticket-shop/index"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#FFC145] text-white font-bold px-8 py-3 text-lg md:text-xl rounded-full hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                参加チケットはこちらから
              </a>
            </div>
          </div>
        </div>
    </div>
  );
}