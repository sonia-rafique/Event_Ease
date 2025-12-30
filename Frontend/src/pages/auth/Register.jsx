import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import Button from '../../components/common/Button'; 

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      toast.success('Account created successfully!');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative p-4">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="w-96 h-96 bg-secondary opacity-30 rounded-full blur-3xl absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-80 h-80 bg-primary opacity-20 rounded-full blur-3xl absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="bg-surface/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl shadow-secondary/30 w-full max-w-lg relative z-10 border border-gray-200 transform hover:scale-[1.01] transition duration-500"
      > 
        <div className="text-center mb-10">
          <h2 className="text-5xl font-extrabold mb-2 text-dark">
            <span className="text-secondary">Join</span> EventEase
          </h2>
          <p className="text-gray-500 text-lg">Create your university account.</p>
        </div>
        
        <div className="space-y-4">
          <input name="name" placeholder="Full Name / Club Name" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary outline-none" required />
          <input name="email" type="email" placeholder="Email Address" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary outline-none" required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-secondary outline-none" required />

          {/* ROLE SELECTION */}
          <div className="flex gap-4 py-2">
            <label className={`flex-1 flex items-center justify-center p-3 border rounded-xl cursor-pointer transition ${formData.role === 'student' ? 'border-secondary bg-secondary/10 text-secondary' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
              <input type="radio" name="role" value="student" checked={formData.role === 'student'} onChange={handleChange} className="hidden" />
              <span className="text-sm font-bold">Student</span>
            </label>
            <label className={`flex-1 flex items-center justify-center p-3 border rounded-xl cursor-pointer transition ${formData.role === 'club' ? 'border-secondary bg-secondary/10 text-secondary' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
              <input type="radio" name="role" value="club" checked={formData.role === 'club'} onChange={handleChange} className="hidden" />
              <span className="text-sm font-bold">Club</span>
            </label>
          </div>
        </div>

        <Button type="submit" variant="secondary" className="w-full mt-6 text-lg py-3">
          Register
        </Button>
        <p className="mt-6 text-center text-gray-500">
          Already have an account? <Link to="/login" className="text-primary font-bold hover:text-indigo-600 transition">Login Here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;