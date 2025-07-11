import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

// Toast component
interface ToastProps {
  message: string;
  isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-[#46AA65] text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-up">
      {message}
    </div>
  );
};

// Define the proposal type
interface Proposal {
  uuid: string;
  url: string;
  title: string;
  abstract: string;
  accepted: boolean;
  speaker: {
    name: string;
    kana: string;
    twitter: string;
    avatar_url: string;
  };
  created: string;
  feedback: {
    open: boolean;
  };
}

function ProposalCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isExpired, setIsExpired] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch proposals
  useEffect(() => {
    // Use a ref to keep track of previous proposal count
    const previousProposalCountRef = { current: 0 };

    const fetchProposals = async () => {
      try {
        // Only show loading state on initial load
        if (previousProposalCountRef.current === 0) {
          setLoading(true);
        }

        const response = await fetch('https://fortee.jp/phpcon-kansai2025/api/proposals');
        if (!response.ok) {
          throw new Error('APIからデータを取得できませんでした');
        }

        const data = await response.json();
        const newProposals = data.proposals;

        // Only update state if the count has changed
        if (newProposals.length !== previousProposalCountRef.current) {
          console.log(`Proposal count changed: ${previousProposalCountRef.current} -> ${newProposals.length}`);

          // Show toast notification if count increased (and not initial load)
          if (previousProposalCountRef.current > 0 && newProposals.length > previousProposalCountRef.current) {
            setToastMessage(`新しいプロポーザルが投稿されました！`);
            setShowToast(true);

            // Hide toast after 3 seconds
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
          }

          setProposals(newProposals);
          previousProposalCountRef.current = newProposals.length;
        }

        setError(null);
      } catch (err) {
        console.error('提案の取得に失敗しました:', err);
        setError('提案の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchProposals();

    // Set up interval to fetch every 10 seconds
    const intervalId = setInterval(fetchProposals, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // No dependencies to avoid infinite loops

  // Set page-specific OGP meta tags
  useEffect(() => {
    // Update document title
    document.title = "プロポーザル募集締切カウントダウン | PHPカンファレンス関西2025";

    // Update OGP meta tags
    const metaTags = {
      'og:title': 'プロポーザル募集締切カウントダウン | PHPカンファレンス関西2025',
      'og:description': 'PHPカンファレンス関西2025のプロポーザル募集は2025年4月20日 23:59までです！',
      'og:url': 'https://2025.kphpug.jp/proposal_countdown',
      'twitter:title': 'プロポーザル募集締切カウントダウン | PHPカンファレンス関西2025',
      'twitter:description': 'PHPカンファレンス関西2025のプロポーザル募集は2025年4月20日 23:59までです！',
      'twitter:url': 'https://2025.kphpug.jp/proposal_countdown'
    };

    // Update meta tags
    Object.entries(metaTags).forEach(([property, content]) => {
      const element = document.querySelector(`meta[property="${property}"]`);
      if (element) {
        element.setAttribute('content', content);
      }
    });

    // Clean up function not needed for meta tags as they persist
  }, []);

  // Countdown timer
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
    <div className="bg-white">
      {/* Toast notification */}
      <Toast message={toastMessage} isVisible={showToast} />

      {/* Main Content */}
      <div className="pt-20 pb-20 px-6">
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

                {/* Proposal Count Display */}
                <div className="bg-[#46AA65] text-white p-6 rounded-lg mx-auto">
                  <h3 className="text-xl font-bold mb-2">現在のプロポーザル応募数</h3>
                  {loading ? (
                    <div className="animate-pulse">
                      <div className="h-12 bg-green-300 bg-opacity-40 rounded w-1/3 mx-auto"></div>
                    </div>
                  ) : error ? (
                    <p className="text-lg text-red-200">{error}</p>
                  ) : (
                    <p className="text-4xl font-bold">{proposals.length}</p>
                  )}
                </div>

                {/* Newest Proposals Display */}
                <div className="bg-white border border-[#46AA65] p-6 rounded-lg mx-auto mt-6">
                  <h3 className="text-xl font-bold text-[#46AA65] mb-4">新着プロポーザル</h3>
                  <div className="space-y-4">
                    {loading ? (
                      // Skeleton loading UI
                      <>
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="border-b border-gray-200 pb-3 last:border-b-0 animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        ))}
                      </>
                    ) : error ? (
                      <p className="text-red-500">データの取得に失敗しました</p>
                    ) : proposals.length > 0 ? (
                      // Sort proposals by creation date (newest first) and take the first 3
                      [...proposals]
                        .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                        .slice(0, 3)
                        .map((proposal) => (
                          <div key={proposal.uuid} className="border-b border-gray-200 pb-3 last:border-b-0">
                            <a 
                              href={proposal.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block hover:text-[#46AA65] transition"
                            >
                              <h4 className="font-bold text-lg">{proposal.title}</h4>
                              <p className="text-gray-600">発表者: {proposal.speaker.name}</p>
                            </a>
                          </div>
                        ))
                    ) : (
                      <p>プロポーザルがまだありません</p>
                    )}
                  </div>
                </div>

                <div>
                  <a
                    href="https://fortee.jp/phpcon-kansai2025/speaker/proposal/cfp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[#FFC145] text-white font-bold px-6 py-2 rounded-full hover:bg-opacity-90 transition"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    今すぐプロポーザルを投稿する
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
                    今すぐプロポーザルを投稿する
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProposalCountdown;
