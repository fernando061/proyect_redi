// pages/blog/[blogId].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MainLayout from '../../app/layouts/MainLayout';
import { getBlogs } from '../../app/service/PostService'; // Importa tu servicio getBlogs

const BlogDetail = () => {
  const router = useRouter();
  const { blogId } = router.query;
  const [blogDetails, setBlogDetails] = useState(null);

  const [showBlogs, setShowBlogs] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showNews, setShowNews] = useState(false);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogsData = await getBlogs();
        
        const details = blogsData.content.find(blog => blog.id.toString() === blogId);

        if (details) {
          setBlogDetails(details);
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    if (blogId) {
      fetchBlogDetails();
    }
  }, [blogId]);

  return (
    <MainLayout setShowBlogs={setShowBlogs} setShowEvents={setShowEvents} setShowNews={setShowNews}>
      <div className="bg-[#f2e8e1] p-8 flex flex-col md:flex-row items-center md:items-start">
        {blogDetails && (
          <div className="md:w-1/2 md:pr-8">
            <Image
              src={blogDetails.photos[0].url_file}
              alt={`Image related to ${blogDetails.title}`}
              width={550}
              height={400}
              className="rounded-xl"
            
            />
          </div>
        )}
        <div className="md:w-1/2 prose">
          {blogDetails ? (
            <div>
              <h1 className="text-3xl font-bold mb-4">{blogDetails.title}</h1>
              <p>{blogDetails.content}</p>
            </div>
          ) : (
            <p>Blog no encontrado</p>
          )}
        </div>
      </div>
    </MainLayout>
  );

};

export default BlogDetail;
