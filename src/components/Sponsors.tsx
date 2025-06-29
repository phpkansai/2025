import babyjob_logo_yoko from '../assets/babyjob_bro_logo.png';
import vaddy_logo from '../assets/vaddy_bro_logo.png';
import kokucho_logo from '../assets/kokucho_bro_logo.png';
import LKGlogo from '../assets/LKG_bro_logo.png';
import karabiner_bro_logo from '../assets/karabiner_bro_logo.png';
import rakko_bro_logo from '../assets/rakko_bro_logo.png';
import eustyle_bro_logo from '../assets/eustyle_bro_logo.png';
import phpnintei_bro_logo from '../assets/phpnintei_bro_logo.png';
import cybozu_bro_logo from '../assets/cybozu_bro_logo.png';
import horizontal_silv_logo from '../assets/horizontal_silv_logo.png';
import HireRoo_silv_logo from '../assets/HireRoo_silv_logo.png';
import iplug_silv_logo from '../assets/iplug_silv_logo.png';
import kaonavi_silv_logo from '../assets/kaonavi_silv_logo.png';
import sacraya_silv_logo from '../assets/sacraya_silv_logo.png';
import betterplace_silv_logo from '../assets/betterplace_silv_logo.png';
import BTM_silv_logo from '../assets/BTM_silv_logo.png';
import sakura_logo from '../assets/sakura_gold_logo.png';
import samuraism_gold_logo from '../assets/samuraism_gold_logo.png';
import lamp_gold_logo from '../assets/lamp_gold_logo.png';
import smaregi_gold_logo from '../assets/smaregi_gold_logo.png';
import RouteZero_pla_logo from '../assets/RouteZero_pla_logo.png';
import gigmatch_logo from '../assets/gigmatch_snac_logo .png';

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
        src: lamp_gold_logo,
        alt: '株式会社ランプ',
        linkUrl: 'https://lamp.jp/',
    },
    {
        src: smaregi_gold_logo,
        alt: '株式会社スマレジ',
        linkUrl: 'https://corp.smaregi.jp/',
    },
];
const snackSponsors = [
    {
        src: gigmatch_logo,
        alt: '株式会社YUZURIHA',
        linkUrl: 'https://gigmatch.jp/',
    },
];
const silverSponsors = [
    {
        src: horizontal_silv_logo,
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
        src: sacraya_silv_logo,
        alt: '有限会社咲楽屋',
        className: 'h-16 w-auto object-contain',
        linkUrl: 'https://www.sacraya.co.jp/',
    },
    {
        src: betterplace_silv_logo,
        alt: '株式会社ベター・プレイス',
        className: 'h-16 w-auto object-contain',
        linkUrl: 'https://bpcom.jp/',
    },
    {
        src: BTM_silv_logo,
        alt: '株式会社BTM',
        className: 'h-16 w-auto object-contain',
        linkUrl: 'https://www.b-tm.co.jp/',
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
        src: eustyle_bro_logo,
        alt: 'ユースタイルラボラトリー株式会社',
        linkUrl: 'https://eustylelab.co.jp/',
    },
    {
        src: cybozu_bro_logo,
        alt: 'サイボウズ株式会社',
        linkUrl: 'https://tech.cybozu.io/',
    },
];

export default function Sponsors() {
  return (
    <section className="py-20 px-6 bg-[#46AA65]">
        <h2 className="text-3xl font-bold text-white text-center mb-10">SPONSORS</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-white mb-8">
            PHPカンファレンス関西2025は、スポンサー企業様のご協力により開催されます。スポンサー企業様のご支援を心より感謝申し上げます。
          </p>
          <p className="text-1xl font-bold text-white text-center mb-10">プラチナスポンサー</p>
          <div className="flex flex-wrap justify-center gap-16 mb-16">
            {platinumSponsors.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-center transform transition-all duration-300 hover:scale-105"
              >
                <a href={s.linkUrl}>
                  <img src={s.src} alt={s.alt} className="h-72 w-auto object-contain" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-1xl font-bold text-white text-center mb-10">ゴールドスポンサー</p>
          <div className="flex flex-wrap justify-center gap-16 mb-16">
            {goldSponsors.map((s, i) => (
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

          <p className="text-1xl font-bold text-white text-center mb-10">おやつスポンサー</p>
          <div className="flex flex-wrap justify-center gap-10 mb-16">
            {snackSponsors[0] && (
              <div className="flex flex-col items-center justify-center transform transition-all duration-300 hover:scale-105">
                <a href={snackSponsors[0].linkUrl}>
                  <img src={snackSponsors[0].src} alt={snackSponsors[0].alt} className="h-32 w-auto object-contain" />
                </a>
              </div>
            )}
          </div>

          <p className="text-1xl font-bold text-white text-center mb-10">シルバースポンサー</p>
          <div className="flex flex-wrap justify-center gap-16 mb-16">
            {silverSponsors.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-center transform transition-all duration-300 hover:scale-105"
              >
                <a href={s.linkUrl}>
                  <img src={s.src} alt={s.alt} className="h-28 w-auto object-contain" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-1xl font-bold text-white text-center mb-10">ブロンズスポンサー</p>
          <div className="flex flex-wrap justify-center gap-16 mb-16">
            {bronzeSponsors.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-center transform transition-all duration-300 hover:scale-105"
              >
                <a href={s.linkUrl}>
                  <img src={s.src} alt={s.alt} className="h-20 w-auto object-contain" />
                </a>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}

