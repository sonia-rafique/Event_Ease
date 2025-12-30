import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import Button from '../common/Button';
import api from '../../services/api';
import RegistrationModal from '../modals/RegistrationModal';

const EventCard = ({ event, isRegistered, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(isRegistered);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const isFull = event.registeredCount >= event.capacity;

  const handleConfirmRegistration = async (formData) => {
    if (user?.role?.toLowerCase() !== 'student') {
      toast.error('Only students can register for events.');
      return;
    }

    setLoading(true);
    try {
      await api.post(`/events/${event._id}/register`, formData);
      toast.success('Registration Successful!');
      setHasRegistered(true);
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden flex flex-col md:flex-row transition duration-300 transform hover:shadow-2xl hover:border-primary/30">

        <div className="md:w-1/3 w-full relative">
          <img
            src={event.bannerImage || 'https://via.placeholder.com/600x400'}
            alt={event.title}
            className="w-full h-48 md:h-full object-cover object-center"
          />
        </div>

        <div className="md:w-2/3 p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-3xl font-extrabold text-dark mb-2 leading-snug">
              <span className="text-sm font-semibold text-primary block mb-1 uppercase tracking-wider">
                {event.clubName || 'University Event'}
              </span>
              <Link to={`/events/${event._id}`} className="hover:text-primary transition-colors line-clamp-2">
                {event.title}
              </Link>
            </h3>

            <div className="flex gap-4 text-sm text-gray-600 mb-4">
              <span>| {formatDate(event.date)}</span>
              <span>| {event.location}</span>
            </div>

            <p className="text-gray-700 line-clamp-3">{event.description}</p>
          </div>

          <div className="flex justify-between items-center pt-5 mt-5 border-t border-gray-200">
            <span className={`px-3 py-1 rounded-full text-sm font-bold
              ${isFull ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'}`}>
              {isFull ? 'FULL CAPACITY' : `${event.capacity - event.registeredCount} Spots Left`}
            </span>

            {hasRegistered ? (
              <span className="text-emerald-600 font-bold flex items-center">✅ Registered</span>
            ) : (
              (!user || user.role?.toLowerCase() === 'student') ? (
                <Button onClick={() => setShowModal(true)} disabled={isFull}>
                  {isFull ? 'Fully Booked' : 'Register Now'}
                </Button>
              ) : (
                <span className="text-amber-600 text-sm font-medium italic">
                  Registration for Students Only
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <RegistrationModal
          event={event}
          user={user}
          submitting={loading}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmRegistration}
        />
      )}
    </>
  );
};

export default EventCard;