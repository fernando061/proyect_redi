/*import { useRouter } from 'next/router';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const BlogPage = ({ blog }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <ReactMarkdown source={blog.content} />
    </div>
  );
};

export const getStaticPaths = async () => {
  // Obtener los slugs de la API de Flask
  const response = await axios.get('http://tu-api-flask/blogs');
  const blogs = response.data;

  // Crear rutas estáticas para cada blog
  const paths = blogs.map(blog => ({
    params: { slug: blog.slug.split('/') },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  // Obtener el blog específico según el slug
  const slug = params.slug.join('/');
  const response = await axios.get(`http://tu-api-flask/blogs/${slug}`);
  const blog = response.data;

  return { props: { blog }, revalidate: 1 };
};

export default BlogPage; */
// frontend/pages/blog/[slug].js
import React from 'react';
import MainLayout from '../../app/layouts/MainLayout';
import BlogCard from '../../app/components/BlogCard';

// Datos falsos para simular blogs
const fakeBlogs = [
  {
    slug: 'blog-1',
    title: 'Blog Ficticio 1',
    image: 'https://via.placeholder.com/150',
    summary: 'Resumen del Blog Ficticio 1',
    content: 'Contenido del Blog Ficticio 1...',
  },
  {
    slug: 'blog-2',
    title: 'Blog Ficticio 2',
    image: 'https://via.placeholder.com/150',
    summary: 'Resumen del Blog Ficticio 2',
    content: 'Contenido del Blog Ficticio 2...',
  },
  // Agrega más blogs según sea necesario
];

const BlogDetail = ({ blog }) => {
  return (
    <MainLayout>
      <BlogCard blog={blog} />
      {/* Puedes mostrar más detalles del blog si es necesario */}
      <div>
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
      </div>
    </MainLayout>
  );
};

export const getStaticPaths = async () => {
  // Crear rutas estáticas para cada blog
  const paths = fakeBlogs.map(blog => ({
    params: { slug: blog.slug.split('/') },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  // Obtener el blog específico según el slug
  const slug = params.slug.join('/');
  
  // Buscar el blog en los datos falsos
  const blog = fakeBlogs.find(blog => blog.slug === slug);

  return { props: { blog }, revalidate: 1 };
};

export default BlogDetail;

