// pages/news/[newsId].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MainLayout from '../../app/layouts/MainLayout';
import { getNews } from '../../app/service/PostService';

const NewsDetail = () => {
  const router = useRouter();
  const { newsId } = router.query;
  const [newsDetails, setNewsDetails] = useState(null);

  const [showBlogs, setShowBlogs] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showNews, setShowNews] = useState(false);

  useEffect(() => {
    const fetchNewsDetails = async () => {
      try {
        const newsData = await getNews();

        const details = newsData.content.find(newsItem => newsItem.id.toString() === newsId);

        if (details) {
          setNewsDetails(details);
        }
      } catch (error) {
        console.error('Error fetching news details:', error);
      }
    };

    if (newsId) {
      fetchNewsDetails();
    }
  }, [newsId]);

  return (
    <MainLayout setShowBlogs={setShowBlogs} setShowEvents={setShowEvents} setShowNews={setShowNews}>
      <div className="bg-[#f2e8e1] p-8 flex flex-col md:flex-row items-center md:items-start">
        {newsDetails && (
          <div className="md:w-1/2 md:pr-8">
            <Image
              src={newsDetails.photos[0].url_file}
              alt={`Image related to ${newsDetails.title}`}
              width={550}
              height={400}
              className="rounded-xl"
            />
          </div>
        )}
        <div className="md:w-1/2 prose">
          {newsDetails ? (
            <div>
              <h1 className="text-3xl font-bold mb-4">{newsDetails.title}</h1>
              <p>{newsDetails.content}</p>
              {/* Otros detalles de la noticia según tu modelo de datos */}
            </div>
          ) : (
            <p>Noticia no encontrada</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default NewsDetail;
