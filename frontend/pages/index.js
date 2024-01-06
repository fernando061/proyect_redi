import React, { useState, useEffect } from 'react';
import BlogCard from '../app/components/BlogCard';
import MainLayout from '../app/layouts/MainLayout';
import Body from '../app/components/HomePage';

const Home = ({ showBlogs }) => {
  const fakeBlogs = [
    {
      slug: 'blog-1',
      title: 'Blog Ficticio 1',
      image: 'https://via.placeholder.com/150',
      summary: 'Resumen del Blog Ficticio 1',
    },
    {
      slug: 'blog-2',
      title: 'Blog Ficticio 2',
      image: 'https://via.placeholder.com/150',
      summary: 'Resumen del Blog Ficticio 2',
    },
    // Agrega más blogs según sea necesario
  ];

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBlogs(fakeBlogs);
      } catch (error) {
        console.error('Error al cargar blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    if (showBlogs) {
      fetchData();
    }
  }, [showBlogs]);

  // Console.log para verificar valores
  console.log('showBlogs inside Home:', showBlogs);
  console.log('loading:', loading);
  console.log('blogs:', blogs);

  return (
    <MainLayout>
      {showBlogs ? (
        <div>
          <h1>Mi Blog</h1>
          {loading ? (
            <p>Cargando blogs...</p>
          ) : (
            <div>
              {blogs.map(blog => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          )}
        </div>
      ) : (
        // Contenido original que se muestra cuando showBlogs es false
        <Body />
      )}
    </MainLayout>
  );
};


export default Home;
