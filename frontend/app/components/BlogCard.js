// app/components/BlogCard.js

const BlogCard = ({ title, url }) => {
  return (
    <div className="border border-[#2E4053] bg-[#EAFAF1] rounded-lg bg-rounded-lg p-4 shadow-md m-5">
      <img src={url} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
      </div>
    </div>
  );
};

export default BlogCard;