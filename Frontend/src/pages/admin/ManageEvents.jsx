import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Button from '../../components/common/Button';

const AdminManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events'); 
      setEvents(res.data);
    } catch (err) {
      toast.error('Failed to load global events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this event globally?")) {
      try {
        await api.delete(`/events/${id}`);
        setEvents(events.filter(e => e._id !== id));
        toast.success('Event removed from database');
      } catch (err) {
        toast.error('Failed to delete event');
      }
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-dark mb-8">Global Event Management</h1>
      <div className="bg-white rounded-2xl shadow-lg-soft p-2 border border-gray-100">
        <div className="divide-y divide-gray-100">
          {loading ? (
            <p className="p-10 text-center font-bold text-gray-500">Loading Database...</p>
          ) : events.map(event => (
            <div key={event._id} className="p-6 flex justify-between items-center hover:bg-gray-50 transition rounded-xl">
              <div>
                <h3 className="text-xl font-bold text-dark">{event.title}</h3>
                <p className="text-gray-400 text-xs italic">{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <Button variant="danger" onClick={() => handleDelete(event._id)}>Remove Event</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminManageEvents;