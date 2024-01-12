// pages/event/[eventId].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MainLayout from '../../app/layouts/MainLayout';
import { getEvents } from '../../app/service/PostService';

const EventDetail = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [eventDetails, setEventDetails] = useState(null);

  const [showBlogs, setShowBlogs] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showNews, setShowNews] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // Utiliza tu servicio getEvents para obtener todos los eventos
        const eventsData = await getEvents();

        // Busca el evento correspondiente según el eventId
        const details = eventsData.content.find(event => event.id.toString() === eventId);

        if (details) {
          setEventDetails(details);
        }
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  return (
    <MainLayout setShowBlogs={setShowBlogs} setShowEvents={setShowEvents} setShowNews={setShowNews}>
      <div className="bg-[#f2e8e1] p-8 flex flex-col md:flex-row items-center md:items-start">
        {eventDetails && (
          <div className="md:w-1/2 md:pr-8">
            <Image
              src={eventDetails.photos[0].url_file}
              alt={`Image related to ${eventDetails.title}`}
              width={550}
              height={400}
              className="rounded-xl"
            />
          </div>
        )}
        <div className="md:w-1/2 prose">
          {eventDetails ? (
            <div>
              <h1 className="text-3xl font-bold mb-4">{eventDetails.title}</h1>
              <p>{eventDetails.content}</p>
              <p>Event Date: {eventDetails.event_date}</p>
              {/* Otros detalles del evento según tu modelo de datos */}
            </div>
          ) : (
            <p>Evento no encontrado</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetail;
