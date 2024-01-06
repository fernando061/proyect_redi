// app/components/BlogCard.js
import React from 'react';
import Link from 'next/link';

const BlogCard = ({ blog }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl">
      <img className="w-full h-48 object-cover object-center" src={blog.image} alt={blog.title} />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
        <p className="text-gray-600">{blog.summary}</p>
        
        <Link href={`/blog/${blog.slug}`}>
          <a className="mt-2 text-blue-500">Ver más</a>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;