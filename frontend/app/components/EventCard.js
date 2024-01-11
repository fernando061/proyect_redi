// components/EventCard
import Link from "next/link";

const EventCard = ({ title, imageUrl, eventId }) => {
  return (
    <Link href={`/event/${eventId}`}>
      <div className="border border-[#2E4053] bg-[#EAFAF1] rounded-lg bg-rounded-lg p-4 shadow-md m-5">
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
