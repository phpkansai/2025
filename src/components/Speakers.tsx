import { useState, useEffect } from 'react';

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

export default function Speakers() {
    const [speakers, setSpeakers] = useState<Proposal[]>([]);
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
  return (
    <section className="bg-white py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#46AA65]">SPEAKER</h2>
        <div className="max-w-4xl mx-auto">
          <p className="text-lg mb-8">
            PHPカンファレンス関西2025では、PHPに関する様々なトピックについて、公募で選ばれたスピーカーによる講演を行います。スピーカーの皆様のご協力に感謝申し上げます。
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {speakers
              .filter((proposal) => proposal.speaker.twitter !== 'phpcon_kansai') 
              .map((proposal) => (
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
  );
}
