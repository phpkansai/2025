import React from 'react';
import { Users, Building2, PartyPopper, ExternalLink, Twitter, File } from 'lucide-react';
import elemaru from './assets/elemaru.png';

// Countdown component
const Countdown = () => {
  const targetDate = new Date('2025-07-18T16:00:00+09:00');
  const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-white text-xl flex items-center space-x-2">
      <span>開催まで:</span>
      <span className="font-mono tabular-nums">
        {timeLeft.days}日 {timeLeft.hours}時間 {timeLeft.minutes}分 {timeLeft.seconds}秒
      </span>
    </div>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#46AA65] text-white py-4 px-6 flex justify-between items-center fixed w-full z-50">
        <div className="flex items-center space-x-4">
          <img src={elemaru} alt="えれ丸" className="h-12 w-12 object-contain" />
          <h1 className="text-xl font-bold">PHP CONFERENCE KANSAI 2025</h1>
        </div>
        <Countdown />
      </header>

      {/* Hero Section */}
      <div className="relative h-screen bg-[#46AA65] flex items-center justify-center text-white"
           style={{
             backgroundImage: 'url(https://2018.kphpug.jp/assets/images/keyvisual.jpg)',
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        <div className="absolute inset-0 bg-[#46AA65] opacity-70"></div>
        <div className="relative text-center space-y-6">
          <img src={elemaru} alt="えれ丸" className="mx-auto h-40 w-40 object-contain" />
          <h1 className="text-5xl font-bold">PHP CONFERENCE KANSAI 2025</h1>
          <p className="text-2xl">PHPでやってみよう</p>
          <p className="text-xl">2025年7月18日(金)・19日(土) 神戸駅前研修センター</p>
          <button className="bg-[#FFC145] text-white px-8 py-3 rounded-full text-xl hover:bg-opacity-90 transition">
            参加チケットはこちらから
          </button>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">PHP CONFERENCE KANSAI 2025</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8">
            PHPカンファレンス関西は、PHPエンジニア（PHPer）がPHPやPHP周辺の技術的知識やノウハウ、体験を共有するための大規模技術カンファレンスです。2011年から過去9回開催されており、毎回その時のPHP最新情報やトレンドの話題で盛り上がります。関西や全国から集まったPHPerがお互いに情報を交換し、エンジニアとしてレベルアップをする場となるべく、6年ぶりの開催となった2024年に続き2025年も開催することになりました。イベント当日は一般公募で集まったエンジニアによる講演をはじめ、その他情報共有を行うための催しが行われます。
          </p>
          <h3 className="text-2xl font-bold text-[#46AA65] mb-4">参加資格</h3>
          <p className="text-lg">
            PHPを使っている人、PHPを使っていた人、PHPに興味がある人など、PHPに関係する人全てに参加資格があります。自身の情報アップデートのためにもぜひお越しください！
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center">
            <Users className="w-16 h-16 text-[#46AA65] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">セッション</h3>
            <p>PHPに関する様々なトピックについて、エキスパートによる講演を行います。</p>
          </div>
          <div className="text-center">
            <Building2 className="w-16 h-16 text-[#46AA65] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">ブース</h3>
            <p>スポンサー企業による展示ブースで、最新技術や製品についての情報を得られます。</p>
          </div>
          <div className="text-center">
            <PartyPopper className="w-16 h-16 text-[#46AA65] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">懇親会</h3>
            <p>参加者同士の交流を深める懇親会を開催します。</p>
          </div>
        </div>
      </section>

      {/* Access */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">ACCESS</h2>
        <div className="max-w-4xl mx-auto">
          <div className="aspect-w-16 aspect-h-9 mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.0139140087717!2d135.1758444!3d34.679598299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60008f4eaccbbf83%3A0x2bc6ac0770c503f8!2z56We5oi46aeF5YmN56CU5L-u44K744Oz44K_44O8!5e0!3m2!1sja!2sjp!4v1744291662358!5m2!1sja!2sjp"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold text-[#46AA65] mb-2">神戸駅前研修センター</h3>
            <p className="mb-4">〒650-0027 兵庫県神戸市中央区中町通２丁目３−１</p>
            <a
              href="https://maps.app.goo.gl/Xytu5L8wmibjbXbHA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#FFC145] text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Googleマップを開く
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#46AA65] text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center mb-8">
            <img src={elemaru} alt="えれ丸" className="h-20 w-20 mb-4 object-contain" />
            <h2 className="text-2xl font-bold">PHP CONFERENCE KANSAI 2025</h2>
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            <a href="https://twitter.com/phpcon_kansai" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://note.com/phpcon_kansai" target="_blank" rel="noopener noreferrer">
              <File className="w-6 h-6" />
            </a>
          </div>
          <div className="text-center">
            <p className="mb-2">PHPカンファレンス関西2025実行委員会</p>
            <p>Copyright © Kansai PHP Users Group</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
