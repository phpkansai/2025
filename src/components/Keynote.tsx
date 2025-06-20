import elemaru from '../assets/elemaru.png';


export default function Hero() {
  return (
    <section id="keynote" className="py-20 px-6 bg-gray-50 scroll-mt-16">
            <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">基調講演</h2>
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden">
                <img 
                    src={elemaru} 
                    alt="基調講演者" 
                    className="md:w-full h-auto mx-auto object-cover"
                />
                </div>
            </div>
            <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-[#46AA65] mb-2">ここに講演のタイトルが入ります。</h3>
                <p className="text-lg">
                ここに講演の概要が入ります。ここに講演の概要が入ります。ここに講演の概要が入ります。ここに講演の概要が入ります。ここに講演の概要が入ります。ここに講演の概要が入ります。ここに講演の概要が入ります。ここに講演の概要が入ります。ここに講演の概要が入ります。
                </p>
                <h3 className="text-xl font-bold text-[#46AA65] mt-4">講演者名</h3>
                <p className="text-base mb-6">
                ここに講演者のプロフィールや経歴などの紹介文が入ります。ここに講演者のプロフィールや経歴などの紹介文が入ります。
                </p>
            </div>
            </div>
    </section>
  );
}