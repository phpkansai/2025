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

// Committee chair IDs
const COMMITTEE_CHAIR_IDS = [
  '592f23d2-c58c-4363-8dce-072c93811400', // あかつか (実行委員長)
  '4d60423c-9ddc-4225-9441-83eb8a483cf9', // SAW (副委員長)
  '8e2d4573-82b1-4fe6-8151-b3fd16f71438', // Kaho Michimae (副委員長)
];

// Committee chair roles
const COMMITTEE_CHAIR_ROLES: Record<string, string> = {
  '592f23d2-c58c-4363-8dce-072c93811400': '実行委員長',
  '4d60423c-9ddc-4225-9441-83eb8a483cf9': '副委員長',
  '8e2d4573-82b1-4fe6-8151-b3fd16f71438': '副委員長',
};

export default function Staff() {
  const [staff, setStaff] = useState<StaffData>({});
  const [committeeChairs, setCommitteeChairs] = useState<StaffMember[]>([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch('https://fortee.jp/phpcon-kansai2025/api/staff?type=simple');
        const data = await response.json();

        // Extract committee chairs from all staff members
        const chairs: StaffMember[] = [];

        // Look through all categories to find committee chairs
        (Object.values(data.staff) as StaffMember[][]).forEach((categoryMembers) => {
          categoryMembers.forEach((member) => {
            if (COMMITTEE_CHAIR_IDS.includes(member.id)) {
              chairs.push(member);
            }
          });
        });

        // Sort committee chairs to maintain consistent order
        const sortedChairs = chairs.sort((a, b) => {
          return COMMITTEE_CHAIR_IDS.indexOf(a.id) - COMMITTEE_CHAIR_IDS.indexOf(b.id);
        });

        setCommitteeChairs(sortedChairs);
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

        {committeeChairs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-center items-center mb-16">
            {committeeChairs.map((chair) => (
              <div key={chair.id} className="flex flex-col items-center justify-center text-center">
                <a href={chair.url} target="_blank" rel="noopener noreferrer" className="block">
                  <img
                    src={chair.avatar_url || 'https://placehold.jp/200x200.png'}
                    alt={chair.name}
                    className="h-28 w-28 object-cover rounded-full mb-2"
                  />
                  <p className="text-base font-bold text-black">{chair.name}</p>
                  <span className="text-sm text-white bg-[#46AA65] px-2 py-1 rounded-full mt-1">
                    {COMMITTEE_CHAIR_ROLES[chair.id]}
                  </span>
                </a>
              </div>
            ))}
          </div>
        )}

        {Object.entries(staff).map(([category, members]) => (
          <div key={category} className="mb-12">
            <h3 className="text-xl font-bold text-[#46AA65] mb-6 text-center">{category}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {members
                .filter(
                  (member) => !COMMITTEE_CHAIR_IDS.includes(member.id)
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
