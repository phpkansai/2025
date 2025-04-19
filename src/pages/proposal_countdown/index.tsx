import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import elemaru from '../../assets/elemaru.png';

function ProposalCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    // Set deadline to April 20, 2025, 23:59:59 JST
    const deadline = new Date('2025-04-20T23:59:59+09:00');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    };
    
    // Calculate immediately
    calculateTimeLeft();
    
    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clean up
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
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
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-[#46AA65] text-center mb-8">
            プロポーザル募集締切カウントダウン
          </h1>
          
          {isExpired ? (
            <div className="text-center space-y-8">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <p className="text-2xl font-bold">募集は終了しました</p>
                <p className="mt-2">プロポーザルの募集期間は終了しました。たくさんのご応募ありがとうございました。</p>
              </div>
              
              <div>
                <a
                  href="https://fortee.jp/phpcon-kansai2025/proposal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#46AA65] text-white font-bold px-6 py-2 rounded-full hover:bg-opacity-90 transition"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  応募されたプロポーザル一覧を見る
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-[#46AA65] text-white p-4 rounded-lg">
                  <div className="text-4xl md:text-6xl font-bold">{timeLeft.days}</div>
                  <div className="text-sm md:text-base mt-2">日</div>
                </div>
                <div className="bg-[#46AA65] text-white p-4 rounded-lg">
                  <div className="text-4xl md:text-6xl font-bold">{timeLeft.hours}</div>
                  <div className="text-sm md:text-base mt-2">時間</div>
                </div>
                <div className="bg-[#46AA65] text-white p-4 rounded-lg">
                  <div className="text-4xl md:text-6xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-sm md:text-base mt-2">分</div>
                </div>
                <div className="bg-[#46AA65] text-white p-4 rounded-lg">
                  <div className="text-4xl md:text-6xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-sm md:text-base mt-2">秒</div>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <p className="text-xl">
                  PHPカンファレンス関西2025のプロポーザル募集は
                  <span className="font-bold text-[#46AA65]">2025年4月20日 23:59</span>
                  までです！
                </p>
                
                <div>
                  <a
                    href="https://fortee.jp/phpcon-kansai2025/speaker/proposal/cfp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#FFC145] text-white font-bold px-6 py-2 rounded-full hover:bg-opacity-90 transition"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    今すぐプロポーザルを提出する
                  </a>
                </div>
              </div>
              
              <div className="bg-gray-100 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-[#46AA65] mb-4">プロポーザル募集について</h2>
                <p className="mb-4">
                  PHPカンファレンス関西2025では、PHPやPHP周辺の技術に関するセッションを募集しています。
                  あなたの知識や経験を共有し、PHPコミュニティに貢献しませんか？
                </p>
                <p className="mb-4">
                  初めての登壇でも大丈夫です。実行委員会がサポートします。
                  ぜひ、あなたの経験や知識を共有してください！
                </p>
                <h3 className="text-lg font-bold text-[#46AA65] mb-2">開催テーマ</h3>
                <p>今年の開催テーマは「PHPでやってみよう！」です。ぜひ、聴衆にもやってみようと思ってもらえるようなトークを期待します。</p>
                <h3 className="text-lg font-bold text-[#46AA65] mb-2">優遇枠</h3>
                <p className="mb-4">
                PHPカンファレンス関西2025のテーマ「PHPでやってみよう」の実現ならびに、関西のPHPerコミュニティ活性化を図るために、以下の4つの枠での応募を特に歓迎いたします。
                </p>
                <div className="space-y-4 mb-6">
                    <div className="bg-green-50 p-3 rounded-md border-l-4 border-[#46AA65]">
                        <h4 className="font-bold">初心者向け枠</h4>
                        <p>初心者PHPerのアクションに繋がるようなトークを歓迎する枠です。</p>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-md border-l-4 border-[#46AA65]">
                        <h4 className="font-bold">関西枠</h4>
                        <p>関西出身・関西在住の方を対象とする枠です。</p>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-md border-l-4 border-[#46AA65]">
                        <h4 className="font-bold">初登壇枠</h4>
                        <p>登壇経験がない方の「登壇にチャレンジしてみよう」という気持ちを押すための枠です。</p>
                    </div>
                    
                    <div className="bg-green-50 p-3 rounded-md border-l-4 border-[#46AA65]">
                        <h4 className="font-bold">しくじり枠</h4>
                        <p>プロダクトなどでの失敗談を共有する枠です。<br/>
                        失敗から得たことを次のアクションへ繋げられるようなトークを歓迎いたします。</p>
                    </div>
                </div>
                <h3 className="text-lg font-bold text-[#46AA65] mb-2">トークテーマ例</h3>
                <ul className="list-disc list-inside space-y-1 mb-4">
                  <li>PHPの新機能</li>
                  <li>フレームワーク</li>
                  <li>テスト・CI/CD</li>
                  <li>セキュリティ</li>
                  <li>パフォーマンスチューニング</li>
                  <li>アーキテクチャ設計</li>
                  <li>PHPと他言語・技術との連携</li>
                  <li>PHPを使った実践事例</li>
                  <li>好奇心をくすぐるニッチで深い話</li>
                </ul>
                <p>
                  上記以外のテーマでも、PHPに関連する内容であれば歓迎します！
                </p>
              </div>
              <div className="text-center space-y-4">
                <div>
                  <a
                    href="https://fortee.jp/phpcon-kansai2025/speaker/proposal/cfp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#FFC145] text-white font-bold px-6 py-2 rounded-full hover:bg-opacity-90 transition"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    今すぐプロポーザルを提出する
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#46AA65] text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center mb-8">
            <img src={elemaru} alt="えれ丸" className="h-20 w-20 mb-4 object-contain" />
            <h2 className="text-2xl font-bold">PHPカンファレンス関西2025</h2>
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

export default ProposalCountdown;
