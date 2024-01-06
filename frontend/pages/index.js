import { useState } from "react";
import MainLayout from '../app/layouts/MainLayout';
import Header from '../app/components/Header';
import Body from '../app/components/HomePage';
import BlogCard from '../app/components/BlogCard';
import EventCard from '../app/components/EventCard';
import NewsCard from '../app/components/NewsCard';
import Footer from '../app/components/Footer';

const HomePage = () => {
  const [showBlogs, setShowBlogs] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showNews, setShowNews] = useState(false);

  return (
    <MainLayout setShowBlogs={setShowBlogs} setShowEvents={setShowEvents} setShowNews={setShowNews}>
      {showBlogs && (
        // Renderizar BlogCards aquí
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <BlogCard title="Blog 1" content="Contenido del Blog 1" imageUrl="https://via.placeholder.com/150" />
          <BlogCard title="Blog 2" content="Contenido del Blog 2" imageUrl="https://via.placeholder.com/150" />
          <BlogCard title="Blog 3" content="Contenido del Blog 3" imageUrl="https://via.placeholder.com/150" />
          {/* Puedes agregar más BlogCards según sea necesario */}
        </div>
      )}

      {showEvents && (
        // Renderizar EventCards aquí
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4"> 
          <EventCard title="Evento 1" date="Fecha del Evento 1" location="Ubicación del Evento 1" imageUrl="https://via.placeholder.com/150" />
          <EventCard title="Evento 2" date="Fecha del Evento 2" location="Ubicación del Evento 2" imageUrl="https://via.placeholder.com/150" />
          {/* Puedes agregar más EventCards según sea necesario */}
        </div>
      )}

      {showNews && (
        // Renderizar NewsCards aquí
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          <NewsCard title="Noticia 1" date="Fecha de la Noticia 1" content="Contenido de la Noticia 1" imageUrl="https://via.placeholder.com/150" />
          <NewsCard title="Noticia 2" date="Fecha de la Noticia 2" content="Contenido de la Noticia 2" imageUrl="https://via.placeholder.com/150" />
          {/* Puedes agregar más NewsCards según sea necesario */}
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
