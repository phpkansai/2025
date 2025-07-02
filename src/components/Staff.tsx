import { useState, useEffect } from 'react';

interface StaffMember {
  id: string;
  name: string;
  url?: string;
  avatar_url: string;
}

interface StaffData {
  [category: string]: StaffMember[];
}

export default function Staff() {
  const [staff, setStaff] = useState<StaffData>({});
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

  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">STAFF</h2>
      <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-8">
          PHPカンファレンス関西2025のスタッフは、エンジニアを中心とするボランティアメンバーで構成されています。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center items-center mb-16">
          <div className="flex flex-col items-center justify-center text-center">
            <a href="https://twitter.com/aki_artisan" target="_blank" rel="noopener noreferrer" className="block">
              <img
                src="https://fortee.jp/files/phpcon-kansai2025/avatar/592f23d2-c58c-4363-8dce-072c93811400.jpg"
                alt="あかつか"
                className="h-28 w-28 object-cover rounded-full mb-2"
              />
              <p className="text-base font-bold text-black">あかつか</p>
              <span className="text-sm text-white bg-[#46AA65] px-2 py-1 rounded-full mt-1">実行委員長</span>
            </a>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <a href="https://twitter.com/kaho_eng" target="_blank" rel="noopener noreferrer" className="block">
              <img
                src="https://fortee.jp/files/phpcon-kansai2025/avatar/8e2d4573-82b1-4fe6-8151-b3fd16f71438.jpg"
                alt="Kaho Michimae"
                className="h-28 w-28 object-cover rounded-full mb-2"
              />
              <p className="text-base font-bold text-black">Kaho Michimae</p>
              <span className="text-sm text-white bg-[#46AA65] px-2 py-1 rounded-full mt-1">副委員長</span>
            </a>
          </div>
        </div>

        {Object.entries(staff).map(([category, members]) => (
          <div key={category} className="mb-12">
            <h3 className="text-xl font-bold text-[#46AA65] mb-6 text-center">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {members
                .filter(
                  (member) =>
                    member.id !== '592f23d2-c58c-4363-8dce-072c93811400' && 
                    member.id !== '8e2d4573-82b1-4fe6-8151-b3fd16f71438'    
                )
                .map((member) => (
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
  );
}
