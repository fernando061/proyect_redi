const EventCard = ({ title, date, location, url }) => {
  return (
    <div className="border border-[#2E4053] bg-[#EAFAF1] rounded-lg bg-rounded-lg p-4 shadow-md m-5">
      <img src={url} alt={title} className="w-full h-40 object-cover mb-4 rounded-t-lg" />
      <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-gray-500">{date}</p>
      <p className="text-sm text-gray-500">{location}</p>
    </div>
    </div>
  );
};

export default EventCard;