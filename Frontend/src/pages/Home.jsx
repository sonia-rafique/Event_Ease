import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext'; 
import { fetchAllClubs, fetchAllEvents } from '../services/publicService'; 
import EventCard from '../components/cards/EventCard'; 
import ClubCard from '../components/cards/ClubCard'; 
import { FaCalendarCheck, FaUsersCog, FaTrophy, FaRocket } from 'react-icons/fa';

const Home = () => {
    const { user } = useContext(AuthContext);
    
    const [clubs, setClubs] = useState([]);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [clubRes, eventRes] = await Promise.all([
                    fetchAllClubs(),
                    fetchAllEvents()
                ]);
                setClubs(clubRes.data || clubRes); 
                setEvents(eventRes.data || eventRes);
            } catch (err) {
                console.error("Failed to load homepage data:", err);
                setError("Failed to load content from the server.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // ---- METRIC CARD (DESIGN FROM CODE 1 ONLY) ----
    const MetricCard = ({ value, label, icon: Icon, textColor }) => (
        <div
    className="
        bg-gradient-to-br from-[#1c3f8e]/10 to-[#06b3d3]/10
        hover:from-[#1c3f8e]/30 hover:to-[#06b3d3]/30
        p-8 rounded-3xl
        shadow-soft-lift hover:shadow-strong-lift
        transform transition-all duration-300
        hover:-translate-y-2
        border border-gray-200
        group
    "
>

            <div className="flex items-center mb-4">
                <Icon
                    className={`
                        text-4xl mr-4 ${textColor}
                        transition-transform duration-300
                        group-hover:scale-110
                    `}
                />
                <span className="text-xl font-semibold text-dark group-hover:text-[#1c3f8e] transition">
                    {label}
                </span>
            </div>
            <div className="text-7xl font-extrabold tracking-tight text-dark group-hover:text-[#1c3f8e] transition">
                {value}
            </div>
        </div>
    );

    if (loading)
        return (
            <div className="text-center py-40 bg-background min-h-screen text-dark">
                <p className="text-2xl text-primary font-semibold">Loading...</p>
            </div>
        );

    if (error)
        return (
            <div className="text-center py-40 bg-background min-h-screen text-red-600">
                <p className="text-2xl">{error}</p>
            </div>
        );

    return (
        <div className="w-full bg-background pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- 1. HERO SECTION --- */}
                <div
                    className="
                        bg-gradient-to-br from-primary/5 to-gradient_end/10
                        py-20 px-8 md:px-16 text-center
                        rounded-[3rem] shadow-deep-soft my-10
                        border border-primary/10
                    "
                >
                    <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tight text-dark">
    Campus Events:
    <br />
    <span
        className="
            block
            text-7xl md:text-8xl
            text-transparent bg-clip-text
            bg-gradient-to-r
            from-[#1c3f8e] to-[#06b3d3]
            italic font-serif
        "
    >
        Unified.
    </span>
</h1>


                    <p className="text-2xl md:text-3xl mb-16 text-gray-600 max-w-5xl mx-auto leading-relaxed">
                        Your Single seamless portal for all university club activities, event registration and community feedback
                    </p>
                </div>

                {/* --- 2. LIVE METRICS SECTION --- */}
                <div className="py-24">
                    <h2 className="text-5xl font-extrabold text-center text-dark mb-16 tracking-tight">
                        Data That Drives Campus Life
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        <MetricCard
                            value={`${events.length}+`}
                            label="Events Hosted"
                            icon={FaCalendarCheck}
                            textColor="text-primary"
                        />
                        <MetricCard
                            value={`${clubs.length}+`}
                            label="Active Organizations"
                            icon={FaUsersCog}
                            textColor="text-secondary"
                        />
                        <MetricCard
                            value="4.9/5"
                            label="User Satisfaction"
                            icon={FaTrophy}
                            textColor="text-accent"
                        />
                        <MetricCard
                            value="30K+"
                            label="Total Registrations"
                            icon={FaRocket}
                            textColor="text-dark"
                        />
                    </div>
                </div>

                {/* --- 3. UPCOMING EVENTS FEED --- */}
                <div className="pt-24 pb-16 border-t border-gray-200">
                    <h2 className="text-5xl font-extrabold text-center text-dark mb-16 tracking-tight">
                        Discover Upcoming Events
                    </h2>

                    <div className="events-feed grid grid-cols-1 gap-12">
                        {events.length > 0 ? (
                            events.map(event => (
                                <EventCard key={event._id} event={event} />
                            ))
                        ) : (
                            <div className="col-span-full text-center p-16 bg-gradient-to-br from-[#1c3f8e]/10 to-[#06b3d3]/10 rounded-2xl shadow-soft-lift border border-gray-200">
                                <p className="text-2xl text-gray-500 font-medium">
                                    No active events found. Time to launch some!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- 4. ACTIVE CLUBS LIST --- */}
                <div className="py-16 border-t border-gray-200">
                    <h2 className="text-5xl font-extrabold text-center text-dark mb-16 tracking-tight">
                        Connect with Every Club
                    </h2>

                    <div className="clubs-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {clubs.length > 0 ? (
                            clubs.map(club => (
                                <ClubCard key={club._id} club={club} />
                            ))
                        ) : (
                            <div className="col-span-full text-center p-16 bg-gradient-to-br from-[#1c3f8e]/10 to-[#06b3d3]/10 rounded-2xl shadow-soft-lift border border-gray-200">
                                <p className="text-2xl text-gray-500 font-medium">
                                    No clubs are currently listed.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- 5. FINAL CTA SECTION --- */}
                <div className="py-24">
                    <div className="bg-surface p-20 rounded-3xl text-center shadow-deep-soft border border-gray-200">
                        <h2 className="text-5xl font-extrabold text-dark mb-6">
                            Ready for Effortless Campus Management?
                        </h2>
                        <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light">
                            Join the next generation of university event planning and discovery with serenity.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
