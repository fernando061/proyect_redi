import axios from 'axios';

const URL = 'http://127.0.0.1:5000'// Reemplaza con la URL de tu API

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${URL}/post/get_type_photo/blog`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await axios.get(`${URL}/post/get_type_photo/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getNews = async () => {
  try {
    const response = await axios.get(`${URL}/post/get_type_photo/news`);
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
