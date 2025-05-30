import { ExternalLink } from 'lucide-react';
import noteIcon from './assets/note.svg';
import XIcon from './assets/x.svg';
import { useState, useEffect } from 'react';
import elemaru from './assets/elemaru.png';
import babyjob_logo_yoko from './assets/babyjob_bro_logo.png';
import vaddy_logo from './assets/vaddy_bro_logo.png';
import kokucho_logo from './assets/kokucho_bro_logo.png';
import LKGlogo from './assets/LKG_bro_logo.png';
import karabiner_bro_logo from './assets/karabiner_bro_logo.png';
import rakko_bro_logo from './assets/rakko_bro_logo.png';
import phpnintei_bro_logo from './assets/phpnintei_bro_logo.png';
import horizontal_blue from './assets/horizontal_silv_logo.png';
import HireRoo_silv_logo from './assets/HireRoo_silv_logo.png';
import iplug_silv_logo from './assets/iplug_silv_logo.png';
import kaonavi_silv_logo from './assets/kaonavi_silv_logo.png';
import sakura_logo from './assets/sakura_gold_logo.png';
import samuraism_gold_logo from './assets/samuraism_gold_logo.png';
import RouteZero_pla_logo from './assets/RouteZero_pla_logo.png';
import gigmatch_logo from './assets/gigmatch_snac_logo .png';
import open_logo from './assets/open.png';
import completed_logo from './assets/completed.png';

interface StaffMember {
  id: string;
  name: string;
  url?: string;
  avatar_url: string;
}

interface StaffData {
  [category: string]: StaffMember[];
}

interface NewsItem {
  id: string;
  title: string;
  published: string;
  body_html: string;
}

interface Speaker {
  name: string;
  kana?: string;
  twitter?: string;
  avatar_url: string;
}

interface Timetable {
  track: string;
  starts_at: string;
  length_min: number;
}

interface Proposal {
  uuid: string;
  url: string;
  title: string;
  abstract: string;
  accepted: boolean;
  speaker: Speaker;
  created: string;
  timetable?: Timetable;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [staff, setStaff] = useState<StaffData>({});
  const [speakers, setSpeakers] = useState<Proposal[]>([]);

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
    const fetchStaff = async () => {
      try {
        const response = await fetch('https://fortee.jp/phpcon-kansai2025/api/staff?type=simple');
        const data = await response.json();
        setStaff(data.staff);
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      }
    };

    fetchStaff();
  }, []);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch('https://fortee.jp/phpcon-kansai2025/api/proposals/accepted');
        const data = await response.json();
        setSpeakers(data.proposals);
      } catch (error) {
        console.error('Failed to fetch speakers:', error);
      }
    };

    fetchSpeakers();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // スポンサー情報を配列で管理
  const platinumSponsors = [
    {
      src: RouteZero_pla_logo,
      alt: '株式会社ルートゼロ',
      linkUrl: 'https://route-zero.com/recruit/',
    },
  ];
  const goldSponsors = [
    {
      src: sakura_logo,
      alt: 'さくらインターネット株式会社',
      linkUrl: 'https://www.sakura.ad.jp/',
    },
    {
      src: samuraism_gold_logo,
      alt: '株式会社サムライズム',
      linkUrl: 'https://samuraism.com/',
    },
    {
      src: completed_logo,
      alt: 'スポンサー企業ロゴ',
      linkUrl: 'https://2025.kphpug.jp/',
    },
    {
      src: completed_logo,
      alt: 'スポンサー企業ロゴ',
      linkUrl: 'https://2025.kphpug.jp/',
    },
  ];
  const snackSponsors = [
    {
      src: gigmatch_logo,
      alt: '株式会社YUZURIHA',
      linkUrl: 'https://yzrh.jp/',
    },
  ];
  const silverSponsors = [
    {
      src: horizontal_blue,
      alt: '株式会社coco',
      linkUrl: 'https://thecoco.jp/',
    },
    {
      src: HireRoo_silv_logo,
      alt: '株式会社ハイヤールー',
      linkUrl: 'https://hireroo.io/',
    },
    {
      src: iplug_silv_logo,
      alt: '株式会社i-plug',
      linkUrl: 'https://i-plug.co.jp/',
    },
    {
      src: kaonavi_silv_logo,
      alt: '株式会社カオナビ',
      linkUrl: 'https://corp.kaonavi.jp/',
    },
    {
      src: completed_logo,
      alt: 'スポンサー企業ロゴ',
      className: 'h-16 w-auto object-contain',
      linkUrl: 'https://2025.kphpug.jp/',
    },
    {
      src: completed_logo,
      alt: 'スポンサー企業ロゴ',
      className: 'h-16 w-auto object-contain',
      linkUrl: 'https://2025.kphpug.jp/',
    },
    {
      src: open_logo,
      alt: 'スポンサー企業ロゴ',
      className: 'h-16 w-auto object-contain',
      linkUrl: 'https://2025.kphpug.jp/',
    },
    {
      src: open_logo,
      alt: 'スポンサー企業ロゴ',
      className: 'h-16 w-auto object-contain',
      linkUrl: 'https://2025.kphpug.jp/',
    },
  ];
  const bronzeSponsors = [
    {
      src: babyjob_logo_yoko,
      alt: 'BABY JOB株式会社',
      linkUrl: 'https://www.b-tm.co.jp/',
    },
    {
      src: vaddy_logo,
      alt: '株式会社ビットフォレスト',
      linkUrl: 'https://www.bitforest.jp/',
    },
    {
      src: kokucho_logo,
      alt: '株式会社コクチョウ',
      linkUrl: 'https://kokuchou.net/',
    },
    {
      src: LKGlogo,
      alt: '株式会社リンケージ',
      linkUrl: 'https://linkage-inc.co.jp/',
    },
    {
      src: karabiner_bro_logo,
      alt: 'カラビナテクノロジー株式会社',
      linkUrl: 'https://karabiner.tech/',
    },
    {
      src: rakko_bro_logo,
      alt: 'ラッコ株式会社',
      linkUrl: 'https://rakko.inc/',
    },
    {
      src: phpnintei_bro_logo,
      alt: 'PHP技術者認定機構',
      linkUrl: 'https://www.phpexam.jp/',
    },
    {
      src: open_logo,
      alt: 'スポンサー企業ロゴ',
      linkUrl: 'https://2025.kphpug.jp/',
    },
    {
      src: open_logo,
      alt: 'スポンサー企業ロゴ',
      linkUrl: 'https://2025.kphpug.jp/',
    },
    {
      src: open_logo,
      alt: 'スポンサー企業ロゴ',
      linkUrl: 'https://2025.kphpug.jp/',
    },
    {
      src: open_logo,
      alt: 'スポンサー企業ロゴ',
      linkUrl: 'https://2025.kphpug.jp/',
    },
    {
      src: open_logo,
      alt: 'スポンサー企業ロゴ',
      linkUrl: 'https://2025.kphpug.jp/',
    },
  ];

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
          <div className="flex space-x-4 items-center">
            <a
              href="https://fortee.jp/phpcon-kansai2025/timetable/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-bold ${isScrolled ? 'text-white' : 'text-[#46AA65]'}`}
            >
              タイムテーブル
            </a>
            <a
              href="https://note.com/phpcon_kansai"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-bold ${isScrolled ? 'text-white' : 'text-[#46AA65]'}`}
            >
              note
            </a>
            <a
              href="https://fortee.jp/phpcon-kansai2025/ticket-shop/index"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center bg-[#FFC145] text-white font-bold px-4 py-1 rounded-full hover:bg-opacity-90 transition ${
                isScrolled ? 'text-white' : 'text-white'
              }`}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              チケット購入
            </a>
          </div>
        </div>
        <div className="md:hidden relative">
          <button
            className={`focus:outline-none ${isScrolled ? 'text-white' : 'text-[#46AA65]'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
              <a
                href="https://fortee.jp/phpcon-kansai2025/timetable/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 first:rounded-t-md"
              >
                タイムテーブル
              </a>
              <a
                href="https://note.com/phpcon_kansai"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100"
              >
                note
              </a>
              <a
                href="https://fortee.jp/phpcon-kansai2025/ticket-shop/index"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100 last:rounded-b-md"
              >
                チケット購入
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
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
          <img
            src={elemaru}
            alt="えれ丸"
            className="mx-auto h-28 w-28 md:h-40 md:w-40 object-contain animate-bounce-slow"
          />
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

      {/* News Section */}
      <section id="news" className="py-20 px-6 bg-gray-100 scroll-mt-16">
        <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">お知らせ</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {news.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#46AA65] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{new Date(item.published).toLocaleDateString()}</p>
              <div
                className={`prose prose-a:text-[#46AA65] prose-a:hover:underline ${item.body_html ? 'mt-4' : ''}`}
                dangerouslySetInnerHTML={{ __html: item.body_html }}
              />
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="py-20 px-6 scroll-mt-16">
        <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">PHPカンファレンス関西2025</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8">
            PHPカンファレンス関西は、PHPエンジニア（PHPer）がPHPやPHP周辺の技術的知識やノウハウ、体験を共有するための大規模技術カンファレンスです。2011年から過去9回開催されており、毎回その時のPHP最新情報やトレンドの話題で盛り上がります。関西や全国から集まったPHPerがお互いに情報を交換し、エンジニアとしてレベルアップをする場となるべく、6年ぶりの開催となった2024年に続き2025年も開催することになりました。イベント当日は一般公募で集まったエンジニアによる講演をはじめ、その他情報共有を行うための催しが行われます。
          </p>
          <h3 className="text-2xl font-bold text-[#46AA65] mb-4">参加資格</h3>
          <p>
            PHPを使っている人、PHPを使っていた人、PHPに興味がある人など、PHPに関係する人全てに参加資格があります。自身の情報アップデートのためにもぜひお越しください！
          </p>
        </div>
      </section>

      {/* Keynote Section */}
      <section id="keynote" className="py-20 px-6 bg-gray-50 scroll-mt-16">
        <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">基調講演</h2>
        <div className="max-w-4xl mx-auto">
          {/* Speaker profile - image and info side by side at the top */}
          <div className="flex flex-col md:flex-row gap-8 mb-10">
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={elemaru}
                  alt="基調講演者"
                  className="md:w-full h-auto mx-auto object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold text-[#46AA65] mb-3">杉本 啓</h3>
              <div className="text-base space-y-3 mb-6">
                <p>株式会社フュージョンズ代表取締役 CEO。</p>
                <p>コンサルティング会社アーサー・アンダーセン（現アクセンチュア/PwC）にて、生産管理、会計およびそれらの周辺領域で、システム開発／業務改革プロジェクト多数を推進。連結会計パッケージソフトウェアの開発責任者を務める。独立して経営管理クラウドfusion_placeを開発。事業展開のためフュージョンズを創業。現役プログラマー。</p>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <p>フュージョンズ：<a href="https://fusions.co.jp/" target="_blank" rel="noopener noreferrer" className="text-[#46AA65] hover:underline">https://fusions.co.jp/</a></p>
                  <p>X（旧Twitter）：<a href="https://x.com/sugimoto_kei" target="_blank" rel="noopener noreferrer" className="text-[#46AA65] hover:underline">@sugimoto_kei</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* Presentation content below */}
          <div>
            <h3 className="text-2xl font-bold text-[#46AA65] mb-4">ソフトウェア・デザインに向かおう <br/> <span className="text-xl">～ 世界を（ちょっとだけ）変えるソフトウェアを目指して ～</span></h3>
            <div className="text-lg space-y-4">
              <p>
                ソフトウェアを作る仕事は労苦以外の何物でもありません。
              </p>
              <p>
                労苦は、複雑な世界に向けて使いやすい道具を作るという仕事の本質的な難しさに起因していて、技術や手法を洗練すれば除去できるものではありません。
              </p>
              <p>
                アジャイルにすれば楽になると思いきや、開発にまつわる周辺的な複雑さが緩和されることによって、役に立つモノを作ること自体に内在する難しさが却って際立ってきます。
              </p>
              <p>
                我々は、何のために、労苦を甘受してソフトウェアを作るのでしょうか。
              </p>
              <p>
                労苦を軽減することも大事ですが、労苦の意味を知ることはそれ以上に重要です。
              </p>
              <p>
                自分たちが作るソフトウェアの存在意義が腑に落ちなければ、私たちはけっして労苦を乗り越えられず、真っ当なソフトウェアを創り得ないでしょう。
              </p>
              <p>
                この基調講演では、その糸口として、ソフトウェア作りとは何か、どうして私たちはソフトウェアを作るのか、それを踏まえてソフトウェアをデザインするとはどういうことか、といったことがらについて、一緒に考えてみましょう。
              </p>
              <p>
                我々の仕事には意味があります。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Access */}
      <section id="access" className="bg-white py-20 px-6 scroll-mt-16">
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
              className="inline-flex items-center bg-[#FFC145] text-white font-bold px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 hover:scale-105"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Googleマップを開く
            </a>
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-20 px-6 bg-[#46AA65]">
        <h2 className="text-3xl font-bold text-white text-center mb-10">SPONSORS</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-white mb-8">
            PHPカンファレンス関西2025は、スポンサー企業様のご協力により開催されます。スポンサー企業様のご支援を心より感謝申し上げます。
          </p>
          <p className="text-1xl font-bold text-white text-center mb-10">プラチナスポンサー</p>
          <div className="flex justify-center mb-16">
            {platinumSponsors.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-center transform transition-all duration-300 hover:scale-105"
              >
                <a href={s.linkUrl}>
                  <img src={s.src} alt={s.alt} className="h-40 w-auto object-contain" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-1xl font-bold text-white text-center mb-10">ゴールドスポンサー</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {goldSponsors.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-center transform transition-all duration-300 hover:scale-105"
              >
                <a href={s.linkUrl}>
                  <img src={s.src} alt={s.alt} className="h-32 w-auto object-contain" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-1xl font-bold text-white text-center mb-10">おやつスポンサー</p>
          <div className="flex flex-wrap justify-center gap-10 mb-16">
            {snackSponsors[0] && (
              <div className="flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105">
                <a href={snackSponsors[0].linkUrl}>
                  <img src={snackSponsors[0].src} alt={snackSponsors[0].alt} className="h-28 w-auto object-contain" />
                </a>
              </div>
            )}
          </div>

          <p className="text-1xl font-bold text-white text-center mb-10">シルバースポンサー</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {silverSponsors.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-center transform transition-all duration-300 hover:scale-105"
              >
                <a href={s.linkUrl}>
                  <img src={s.src} alt={s.alt} className="h-24 w-auto object-contain" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-1xl font-bold text-white text-center mb-10">ブロンズスポンサー</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {bronzeSponsors.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-center transform transition-all duration-300 hover:scale-105"
              >
                <a href={s.linkUrl}>
                  <img src={s.src} alt={s.alt} className="h-16 w-auto object-contain" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaker */}
      <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#46AA65]">SPEAKER</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8">
            PHPカンファレンス関西2025では、PHPに関する様々なトピックについて、公募で選ばれたスピーカーによる講演を行います。スピーカーの皆様のご協力に感謝申し上げます。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {speakers.map((proposal) => (
              <div key={proposal.uuid} className="flex flex-col items-center justify-start text-center min-h-[160px]">
                <a
                  href={proposal.speaker.twitter ? `https://x.com/${proposal.speaker.twitter}` : proposal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-start transform transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={proposal.speaker.avatar_url || 'https://placehold.jp/200x200.png'}
                    alt={proposal.speaker.name}
                    className="h-24 w-24 object-cover rounded-full mb-2"
                  />
                  <p className="text-sm font-medium">{proposal.speaker.name}</p>
                  <p className="text-xs min-h-[1.25rem]">
                    {proposal.speaker.twitter ? `@${proposal.speaker.twitter}` : '\u00A0'}
                  </p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">STAFF</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8">
            PHPカンファレンス関西2025のスタッフは、エンジニアを中心とするボランティアメンバーで構成されています。
          </p>
          {Object.entries(staff).map(([category, members]) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-bold text-[#46AA65] mb-6 text-center">{category}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                {members.map((member) => (
                  <div key={member.id} className="flex flex-col items-center justify-center text-center min-h-[160px]">
                    <a
                      href={member.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transform transition-all duration-300 hover:scale-105"
                    >
                      <img
                        src={member.avatar_url || 'https://placehold.jp/200x200.png'}
                        alt={member.name}
                        className="h-24 w-24 object-cover rounded-full mb-2"
                      />
                      <p className="text-sm font-medium text-black text-center">{member.name}</p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#46AA65] text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center mb-8">
            <img src={elemaru} alt="えれ丸" className="h-20 w-20 mb-4 object-contain animate-bounce-slow" />
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
    </div>
  );
}

export default App;
