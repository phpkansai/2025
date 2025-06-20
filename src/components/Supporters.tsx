import personalSponsors from "../data/personal_sponsors.json";
import motttoouenSponsors from "../data/motto_ouen_sponsors.json";

export default function Supporters() {
  return (
   <section className="bg-gray-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#46AA65]">INDIVIDUAL SPONSORS</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8">
            PHPカンファレンス関西2025にご支援いただいた個人スポンサーおよび、もっと応援券をご購入いただいた皆様です。温かいご支援をありがとうございます！
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {Array.from(
              new Map(
                [...personalSponsors, ...motttoouenSponsors].map((sponsor) => [sponsor.x_id, sponsor])
              ).values()
            ).map((sponsor, index) => (
              <div key={index} className="flex flex-col items-center justify-start text-center min-h-[160px]">
                <a
                  href={`https://x.com/${sponsor.x_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-start transform transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={`https://unavatar.io/twitter/${sponsor.x_id}`}
                    alt={sponsor.name}
                    className="h-24 w-24 object-cover rounded-full mb-2"
                    onError={(e) => (e.currentTarget.src = '/default-avatar.png')}
                  />
                  <p className="text-sm font-medium">{sponsor.name}</p>
                  <p className="text-xs text-gray-600">@{sponsor.x_id}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
