export default function StickerCollection() {
  return (
    <div className="flex flex-col bg-white">
      {/* Main Content */}
      <main className="flex-grow pt-28 pb-10 px-6">
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