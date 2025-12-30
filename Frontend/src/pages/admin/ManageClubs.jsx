import { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Button from '../../components/common/Button';

const ManageClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    try {
      const { data } = await api.get('/clubs'); 
      setClubs(data);
    } catch (err) {
      toast.error('Failed to load clubs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This will delete the club and all its associated events.")) return;
    try {
      await api.delete(`/admin/clubs/${id}`);
      setClubs(clubs.filter(club => club._id !== id));
      toast.success('Club deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed. Check admin backend routes.');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-dark mb-8">Manage Clubs</h1>
      <div className="bg-white rounded-2xl shadow-lg-soft overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-5 font-bold">Club Name</th>
              <th className="p-5 font-bold">Email</th>
              <th className="p-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan="3" className="p-10 text-center text-gray-500">Loading clubs...</td></tr>
            ) : clubs.map(club => (
              <tr key={club._id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-semibold text-dark">{club.name}</td>
                <td className="p-4 text-gray-600">{club.email}</td>
                <td className="p-4 text-right">
                  <Button variant="danger" onClick={() => handleDelete(club._id)}>Delete Club</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClubs;