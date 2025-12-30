import { useEffect, useState, useContext } from 'react';
import api from '../../services/api';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ManageEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const currentId = user?._id || user?.id;
      const res = await api.get(`/events?clubId=${currentId}`);
      setEvents(res.data);
    } catch (err) {
      toast.error("Failed to load your events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchEvents();
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this event permanently?")) {
      try {
        await api.delete(`/events/${id}`);
        setEvents(events.filter(event => event._id !== id));
        toast.success("Event deleted from database");
      } catch (err) {
        toast.error(err.response?.data?.message || "Delete failed");
      }
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-slate-500">Loading Database...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-800">Your Events</h1>
        <Link to="/club/create-event" className="bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-600 transition">
          + New Event
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-slate-400 text-xs uppercase font-bold tracking-widest">
              <th className="p-6">Event Details</th>
              <th className="p-6">Date & Time</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {events.length > 0 ? (
              events.map(event => (
                <tr key={event._id} className="hover:bg-slate-50 transition">
                  <td className="p-6">
                    <div className="font-bold text-slate-800">{event.title}</div>
                    <div className="text-slate-400 text-sm truncate max-w-xs">{event.location}</div>
                  </td>
                  <td className="p-6 text-slate-600 font-medium">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => handleDelete(event._id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-20 text-center text-slate-400 font-medium">
                  No events found. Click "+ New Event" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;