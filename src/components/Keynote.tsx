import sugimotoKei from '../assets/sugimoto-kei.jpg';


export default function Keynote() {
  return (
    <section id="keynote" className="py-20 px-6 bg-gray-50 scroll-mt-16">
      <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">基調講演</h2>
      <div className="max-w-4xl mx-auto">
        {/* Presentation content below */}
        <div className="mb-10">
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
        {/* Speaker profile - image and info in single box */}
        <div className="bg-white rounded-lg p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <div className="rounded-lg overflow-hidden aspect-square">
                <img
                  src={sugimotoKei}
                  alt="杉本 啓"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-xl font-bold text-[#46AA65] mb-3">杉本 啓</h3>
              <div className="text-base space-y-3">
                <p>株式会社フュージョンズ代表取締役 CEO。</p>
                <p>コンサルティング会社アーサー・アンダーセン（現アクセンチュア/PwC）にて、生産管理、会計およびそれらの周辺領域で、システム開発／業務改革プロジェクト多数を推進。連結会計パッケージソフトウェアの開発責任者を務める。独立して経営管理クラウドfusion_placeを開発。事業展開のためフュージョンズを創業。現役プログラマー。</p>
                <div className="flex flex-col sm:flex-row sm:space-x-4">
                  <p>フュージョンズ：<a href="https://fusions.co.jp/" target="_blank" rel="noopener noreferrer" className="text-[#46AA65] hover:underline">https://fusions.co.jp/</a></p>
                  <p>X（旧Twitter）：<a href="https://x.com/sugimoto_kei" target="_blank" rel="noopener noreferrer" className="text-[#46AA65] hover:underline">@sugimoto_kei</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
