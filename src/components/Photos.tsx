export default function Photos() {
  return (
    <section id="photos" className="py-20 px-6 bg-white scroll-mt-16">
      <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">写真</h2>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg mb-8">
          PHPカンファレンス関西2025の当日の様子をご覧いただけます。
        </p>
        <a
          href="https://photos.app.goo.gl/8y94DTKdm28hLsU77"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#46AA65] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#358a50] transition-colors"
        >
          当日の写真を見る
        </a>
      </div>
    </section>
  );
}