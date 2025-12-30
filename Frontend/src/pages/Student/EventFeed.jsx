import { useEffect, useState } from 'react';
import api from '../../services/api'; 

const EventFeed = () => {
    const [clubs, setClubs] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const clubRes = await api.get('/clubs');
            setClubs(clubRes.data);

            const eventRes = await api.get('/events');
            setEvents(eventRes.data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Explore Clubs & Events</h1>

            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Clubs</h2>
                {clubs.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {clubs.map(club => (
                            <div key={club._id} className="text-center p-4 border rounded-lg">
                                <img src={club.logo} alt={club.name} className="w-20 h-20 mx-auto rounded-full object-cover mb-2" />                                 <p className="font-medium">{club.name}</p>
                            </div>
                        ))}
                    </div>
                ) : <p>No clubs registered yet.</p>}
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
                {events.length > 0 ? (
                    <div className="space-y-4">
                        {events.map(event => (
                            <div key={event._id} className="p-4 bg-white shadow rounded-lg">
                                <h3 className="font-bold">{event.title}</h3>
                                <p className="text-sm text-gray-600">
                                    By: {event.clubId.name} | Date: {new Date(event.date).toLocaleDateString()}
                                </p>
                                <button className="text-primary mt-2">Register Now</button>
                            </div>
                        ))}
                    </div>
                ) : <p>No events scheduled.</p>}
            </div>
        </div>
    );
};

export default EventFeed;