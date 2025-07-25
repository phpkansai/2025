import { ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import elemaru from '../assets/elemaru.png';
import image1 from '../assets/event/image1.jpg';
import image2 from '../assets/event/image2.jpg';
import image3 from '../assets/event/image3.jpeg';
import image4 from '../assets/event/image4.jpeg';

export default function Hero() {
  const images = [image1, image2, image3, image4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen bg-[#46AA65] flex items-center justify-center text-white pt-16 md:pt-0">
      {/* Background image container */}
      {images.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Green overlay */}
      <div className="absolute inset-0 bg-[#46AA65] opacity-80 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center space-y-4 md:space-y-6">
        <img src={elemaru} alt="えれ丸" className="mx-auto h-28 w-28 md:h-40 md:w-40 object-contain animate-float" />
        <h1 className="text-3xl md:text-5xl font-bold animate-slide-up">PHPカンファレンス関西2025</h1>
        <p className="text-2xl md:text-4xl animate-slide-up-delay-1">
          2025年
          <span className="font-bold text-3xl md:text-5xl">7</span>月
          <span className="font-bold text-3xl md:text-5xl">18</span>日(金)・
          <span className="font-bold text-3xl md:text-5xl">19</span>日(土)
        </p>
        <p className="text-base md:text-xl animate-slide-up-delay-2">神戸駅前研修センター</p>
        <p className="text-xl md:text-2xl font-bold text-yellow-300 animate-slide-up-delay-2 mt-4">
          ～ 開催終了しました ～
        </p>
        <p className="text-xl md:text-2xl font-bold text-yellow-300 animate-slide-up-delay-2 mt-4">
          ～ たくさんのご参加ありがとうございました ～
        </p>
        <div className="flex flex-col space-y-4 animate-slide-up-delay-3">
          <div>
            <span
              className="inline-flex items-center bg-gray-400 text-white font-bold px-8 py-3 text-lg md:text-xl rounded-full cursor-not-allowed opacity-60"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              参加チケットはこちらから
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
