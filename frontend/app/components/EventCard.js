const EventCard = ({ title, date, location, imageUrl }) => {
    return (
      <div className="border border-[#2E4053] bg-[#EAFAF1] rounded-lg bg-rounded-lg p-4 shadow-md m-5">
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover mb-4 rounded-t-lg" />
        <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
        <p className="text-gray-700">{date}</p>
        <p className="text-gray-700">{location}</p>
      </div>
    );
  };
  
  export default EventCard;