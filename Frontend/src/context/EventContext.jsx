import { createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/events');
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching events');
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const createEvent = async (formData) => {
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };
      const { data } = await api.post('/events', formData, config);
      
      setEvents((prevEvents) => [data, ...prevEvents]);
      toast.success('Event created successfully!');
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create event';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await api.delete(`/events/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      toast.success('Event deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete event');
    }
  };

  const registerForEvent = async (eventId) => {
    try {
      await api.post('/events/register', { eventId });
      toast.success('Registration successful!');
      
      fetchEvents(); 
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  return (
    <EventContext.Provider 
      value={{ 
        events, 
        loading, 
        error, 
        fetchEvents, 
        createEvent, 
        deleteEvent, 
        registerForEvent 
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;