//pages/index.js
import React, { useState, useEffect } from "react";
import MainLayout from '../app/layouts/MainLayout';
import Header from '../app/components/Header';
import Body from '../app/components/HomePage';
import BlogCard from '../app/components/BlogCard';
import EventCard from '../app/components/EventCard';
import NewsCard from '../app/components/NewsCard';
import Footer from '../app/components/Footer';
import { getBlogs, getEvents, getNews } from '../app/service/PostService'; 
import { useRouter } from 'next/router';

const HomePage = () => {
 /* const [data, setData] = useState({
    blogs: [],
    events: [],
    news: [],
  });*/
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);

  const [showBlogs, setShowBlogs] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showNews, setShowNews] = useState(false);

  const router = useRouter();
  const { blogId } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de blogs
        const blogsData = await getBlogs();
        console.log(blogsData.content)
        setBlogs(blogsData.content);

        // Obtener datos de eventos
        const eventsData = await getEvents();
        setEvents(eventsData);

        // Obtener datos de noticias
        const newsData = await getNews();
        setNews(newsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Llamar a la función para cargar datos
    fetchData();
  }, []);
  const handleBlogClick = (blogId) => {
    // Navega a la página de detalles del blog al hacer clic en un BlogCard
    router.push(`/blog/${blogId}`);
  };

  return (
    <MainLayout setShowBlogs={setShowBlogs} setShowEvents={setShowEvents} setShowNews={setShowNews}>
     
     {showBlogs && (
        // Renderizar lista de blogs
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <h1>Latest Blogs</h1>
          {blogs.map(blog => (
            <BlogCard key={blog.id}
            title={blog.title}
            imageUrl={blog.photos[0].url_file}
            blogId={blog.id}
            onClick={() => handleBlogClick(blog.id)}/>
          ))}
        </div>
      )}

      {showEvents && (
        // Renderizar lista de eventos
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <h1>Upcoming Events</h1>
          {events.map(event => (
            <EventCard key={event.id} title={event.title} imageUrl={blog.photos[0].url_file} />
          ))}
        </div>
      )}

      {showNews && (
        // Renderizar lista de noticias
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <h1 className="font-bold">Latest News</h1>
          {news.map(newsItem => (
            <NewsCard key={newsItem.id} title={newsItem.title} imageUrl={blog.photos[0].url_file} />
          ))}
        </div>
      )}
      {!showBlogs && !showEvents && !showNews && blogId && (
        // Renderizar la página de detalles del blog
        // Puedes crear y utilizar un componente BlogDetail para esto
        // y pasar el blogId como una propS
        <BlogDetail blogId={blogId} />
      )}

      {!showBlogs && !showEvents && !showNews && !blogId && (
        // Otras partes de tu página
        <Body />
      )}

      
    </MainLayout>
  );
};

export default HomePage;