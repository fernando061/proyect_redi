import React, { useState, useEffect } from "react";
import MainLayout from '../app/layouts/MainLayout';
import Header from '../app/components/Header';
import Body from '../app/components/HomePage';
import BlogCard from '../app/components/BlogCard';
import EventCard from '../app/components/EventCard';
import NewsCard from '../app/components/NewsCard';
import Footer from '../app/components/Footer';
import { getBlogs, getEvents, getNews } from '../app/service/PostService'; 

const HomePage = () => {
 /* const [data, setData] = useState({
    blogs: [],
    events: [],
    news: [],
  });*/
  const [blogs, setBlogs] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);

  /*const [showBlogs, setShowBlogs] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showNews, setShowNews] = useState(false);*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos de blogs
        const blogsData = await getBlogs();
        setBlogs(blogsData);

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

  return (
    <MainLayout setShowBlogs={setShowBlogs} setShowEvents={setShowEvents} setShowNews={setShowNews}>
     
     {showBlogs && (
        // Renderizar lista de blogs
        <div>
          <h1>Latest Blogs</h1>
          {blogs.map(blog => (
            <BlogCard key={blog.id} title={blog.title} imageUrl={blog.imageUrl} />
          ))}
        </div>
      )}

      {showEvents && (
        // Renderizar lista de eventos
        <div>
          <h1>Upcoming Events</h1>
          {events.map(event => (
            <EventCard key={event.id} title={event.title} imageUrl={event.imageUrl} />
          ))}
        </div>
      )}

      {showNews && (
        // Renderizar lista de noticias
        <div>
          <h1>Latest News</h1>
          {news.map(newsItem => (
            <NewsCard key={newsItem.id} title={newsItem.title} imageUrl={newsItem.imageUrl} />
          ))}
        </div>
      )}
     

      {!showBlogs && !showEvents && !showNews && (
        // Otras partes de tu página
        <Body />
      )}

      
    </MainLayout>
  );
};

export default HomePage;