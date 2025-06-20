import { useState, useEffect } from 'react';
interface NewsItem {
  id: string;
  title: string;
  published: string;
  body_html: string;
}
export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://fortee.jp/phpcon-kansai2025/api/news');
        const data = await response.json();
        setNews(data.news);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      }
    };

    fetchNews();
  }, []);
  
  return (
      <section id="news" className="py-20 px-6 bg-gray-100 scroll-mt-16">
        <h2 className="text-3xl font-bold text-[#46AA65] text-center mb-10">お知らせ</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {news.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[#46AA65] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500">{new Date(item.published).toLocaleDateString()}</p>
              <div
                className={`prose prose-a:text-[#46AA65] prose-a:hover:underline ${item.body_html ? 'mt-4' : ''}`}
                dangerouslySetInnerHTML={{ __html: item.body_html }}
              />
            </div>
          ))}
        </div>
      </section>
  );
}
