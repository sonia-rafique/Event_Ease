import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [summary, setSummary] = useState({ 
    totalEvents: 0, 
    totalClubs: 0, 
    totalRegistrations: 0, 
    totalStudents: 0,
    upcomingEvents: [] 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/dashboard/summary'); 
      setSummary(data);
      toast.success('Dashboard data loaded successfully!');
    } catch (err) {
      console.error('Error fetching dashboard summary:', err);
      toast.error('Failed to load dashboard data. Ensure you are logged in as admin.');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, color, icon }) => (
    <div className="bg-surface p-6 rounded-xl shadow-lg-soft border-l-4" style={{ borderColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-extrabold text-dark mt-1">{loading ? '...' : value}</p>
        </div>
        <div className="text-3xl" style={{ color: color }}>
          {icon}
        </div>
      </div>
    </div>
  );
  
  const EventItem = ({ event }) => (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150">
      <div>
        <p className="font-semibold text-dark">{event.title}</p>
        <p className="text-xs text-gray-500 mt-1">
          By {event.clubName} | {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </p>
      </div>
      <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
        {event.registeredCount} Registered
      </span>
    </div>
  );

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-dark mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          title="Total Events" 
          value={summary.totalEvents} 
          color="#4F46E5"
        />
        <StatCard 
          title="Active Clubs" 
          value={summary.totalClubs} 
          color="#10B981"
        />
        <StatCard 
          title="Total Students" 
          value={summary.totalStudents} 
          color="#FBBF24"
        />
        <StatCard 
          title="Total Registrations" 
          value={summary.totalRegistrations} 
          color="#EF4444"
        />
      </div>

      <div className="bg-surface p-8 rounded-2xl shadow-lg-soft">
        <h2 className="text-2xl font-bold text-dark mb-6 border-b pb-2">Next 5 Upcoming Events</h2>
        <div className="space-y-3">
          {loading ? (
            <p className="text-gray-500">Loading events...</p>
          ) : summary.upcomingEvents.length > 0 ? (
            summary.upcomingEvents.map(event => (
              <EventItem key={event._id} event={event} />
            ))
          ) : (
            <p className="text-gray-500">No upcoming events scheduled.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;