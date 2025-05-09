import { Users, Building2, PartyPopper, ExternalLink } from 'lucide-react';
import noteIcon from './assets/note.svg';
import XIcon from './assets/x.svg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import elemaru from './assets/elemaru.png';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  interface NewsItem {
    id: string;
    title: string;
    published: string;
    body_html: string;
  }

  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://fortee.jp/phpcon-kansai2025/api/news');
        const data = await response.json();
        setNews(data.news);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`py-4 px-6 flex justify-between items-center fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#46AA65] text-white' : 'bg-white text-[#46AA65]'
        }`}
      >
        <div className="flex items-center space-x-2 md:space-x-4">
          <img src={elemaru} alt="えれ丸" className="h-8 w-8 md:h-12 md:w-12 object-contain" />
          <h1 className="text-base md:text-xl font-bold">PHPカンファレンス関西2025</h1>
        </div>
        <div className="hidden md:flex space-x-4">
          <div className="flex space-x-4">
            <Link
              to="/proposal_countdown"
              className={`text-sm hover:underline ${
                isScrolled ? 'text-white' : 'text-[#46AA65]'
              }`}
            >
              プロポーザル締切カウントダウン
            </Link>
            <a
              href="https://fortee.jp/phpcon-kansai2025/proposal/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm hover:underline ${
                isScrolled ? 'text-white' : 'text-[#46AA65]'
              }`}
            >
              プロポーザル一覧
            </a>
            <a
              href="https://note.com/phpcon_kansai"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm hover:underline ${
                isScrolled ? 'text-white' : 'text-[#46AA65]'
              }`}
            >
              note
            </a>
          </div>
        </div>
        <div className="md:hidden relative">
          <button
            className={`focus:outline-none ${
              isScrolled ? 'text-white' : 'text-[#46AA65]'
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <Link
                to="/proposal_countdown"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md"
              >
                プロポーザル締切カウントダウン
              </Link>
              <a
                href="https://fortee.jp/phpcon-kansai2025/proposal/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                プロポーザル一覧
              </a>
              <a
                href="https://note.com/phpcon_kansai"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 last:rounded-b-md"
              >
                note
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-screen bg-[#46AA65] flex items-center justify-center text-white pt-16 md:pt-0"
           style={{
             backgroundImage: 'url(https://2018.kphpug.jp/assets/images/keyvisual.jpg)',
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        <div className="absolute inset-0 bg-[#46AA65] opacity-70"></div>
        <div className="relative text-center space-y-4 md:space-y-6">
          <img src={elemaru} alt="えれ丸" className="mx-auto h-28 w-28 md:h-40 md:w-40 object-contain" />
          <h1 className="text-3xl md:text-5xl font-bold">PHPカンファレンス関西2025</h1>
          <p className="text-2xl md:text-4xl">
            2025年
            <span className="font-bold text-3xl md:text-5xl">7</span>月
            <span className="font-bold text-3xl md:text-5xl">18</span>日(金)・
            <span className="font-bold text-3xl md:text-5xl">19</span>日(土)
          </p>
          <p className="text-base md:text-xl">神戸駅前研修センター</p>
          <div className="flex flex-col space-y-4">
            <div>
              <a
                href="https://fortee.jp/phpcon-kansai2025/sponsor/form"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#FFC145] text-white font-bold px-6 py-2 rounded-full hover:bg-opacity-90 transition"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                スポンサー募集中！
              </a>
            </div>
            <div className="text-center">
              <div>
                <p className="text-sm mb-1">4月20日まで！！</p>
                <a
                  href="https://fortee.jp/phpcon-kansai2025/speaker/proposal/cfp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#FFC145] text-white font-bold px-6 py-2 rounded-full hover:bg-opacity-90 transition"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  プロポーザル募集中！
                </a>
              </div>
            </div>
            <div>
              <div className="text-center">
                <p className="text-sm mb-1">Coming Soon</p>
                <button
                  disabled
                  className="inline-flex items-center bg-gray-400 text-white font-bold px-6 py-2 rounded-full text-opacity-70 cursor-not-allowed"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  参加チケットはこちらから
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">お知らせ</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {news.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#46AA65] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{new Date(item.published).toLocaleDateString()}</p>
              <div
                className="prose prose-a:text-[#46AA65] prose-a:hover:underline"
                dangerouslySetInnerHTML={{ __html: item.body_html }}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">PHPカンファレンス関西2025</h2>
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
            <p>PHPに関する様々なトピックについて、公募で選ばれたスピーカーによる講演を行います。</p>
          </div>
          <div className="text-center">
            <Building2 className="w-16 h-16 text-[#46AA65] mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-4">ブース</h3>
            <p>スポンサー企業様によるブース出展で、技術動向や製品についての情報を得られます。</p>
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
              className="inline-flex items-center bg-[#FFC145] text-white font-bold px-6 py-2 rounded-full hover:bg-opacity-90 transition"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Googleマップを開く
            </a>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-20 px-6 bg-[#46AA65] ">
        <h2 className="text-2xl font-bold text-white text-center mb-10">SPONSORS</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8">
            PHPカンファレンス関西2025は、スポンサー企業様のご協力により開催されます。スポンサー企業様のご支援を心より感謝申し上げます。
          </p>
          <p className="text-1xl font-bold text-white text-center mb-10">プラチナスポンサー</p>
          <div className="flex justify-center mb-16">
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-32 w-auto object-contain"
              />
            </div>
          </div>
          <p className="text-1xl font-bold text-white text-center mb-10">ゴールドスポンサー</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-24 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-24 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-24 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-24 w-auto object-contain"
              />
            </div>
          </div>
          <p className="text-1xl font-bold text-white text-center mb-10">シルバースポンサー</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-16 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>
          
          <p className="text-1xl font-bold text-white text-center mb-10">ブロンズスポンサー</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://placehold.jp/300x150.png"
                alt="スポンサー企業ロゴ"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Speaker */}
      <section className="bg-[#AED850] py-20 px-6">
        <h2 className="text-3xl font-bold text-white text-center mb-10">SPEAKER</h2>
        <div className="max-w-6xl mx-auto">
          <p className="text-lg mb-8">
            PHPカンファレンス関西2025では、PHPに関する様々なトピックについて、公募で選ばれたスピーカーによる講演を行います。スピーカーの皆様のご協力に感謝申し上げます。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {/* Row 1 */}
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー1"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名1</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー2"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名2</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー3"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名3</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー4"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名4</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー5"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名5</p>
            </div>
            
            {/* Row 2 */}
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー6"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名6</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー7"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名7</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー8"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名8</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー9"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名9</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー10"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名10</p>
            </div>
            
            {/* Row 3 */}
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー11"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名11</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー12"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名12</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー13"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名13</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー14"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名14</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー15"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名15</p>
            </div>
            
            {/* Row 4 */}
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー16"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名16</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー17"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名17</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー18"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名18</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー19"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名19</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                src="https://placehold.jp/200x200.png"
                alt="スピーカー20"
                className="h-24 w-24 object-cover rounded-full mb-2"
              />
              <p className="text-sm font-medium text-white text-center">スピーカー名20</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#46AA65] text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center mb-8">
            <img src={elemaru} alt="えれ丸" className="h-20 w-20 mb-4 object-contain" />
            <h2 className="text-2xl font-bold">PHPカンファレンス関西2025</h2>
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            <a href="https://x.com/phpcon_kansai" target="_blank" rel="noopener noreferrer">
              <img src={XIcon} alt="X" className="w-6 h-6" />
            </a>
            <a href="https://note.com/phpcon_kansai" target="_blank" rel="noopener noreferrer">
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
    </div>
  );
}

export default App;
