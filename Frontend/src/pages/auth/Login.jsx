import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../../components/common/Button'; 

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    if (res.success) {
      toast.success('Login Successful');
      navigate('/');
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative p-4">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="w-96 h-96 bg-primary opacity-30 rounded-full blur-3xl absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-80 h-80 bg-secondary opacity-20 rounded-full blur-3xl absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="bg-surface/95 backdrop-blur-md p-10 rounded-3xl shadow-2xl shadow-primary/30 w-full max-w-lg relative z-10 border border-gray-200 transform hover:scale-[1.01] transition duration-500"
      > 
        <div className="text-center mb-10">
          <h2 className="text-5xl font-extrabold mb-2 text-dark">
            <span className="text-primary">Event</span>Access
          </h2>
          <p className="text-gray-500 text-lg">Sign in to your university portal.</p>
        </div>
        
        <input 
          className="w-full mb-4 p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
          placeholder="University Email" 
          type="email" 
          onChange={(e) => setForm({...form, email: e.target.value})} 
          required
        />
        <input 
          className="w-full mb-6 p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none" 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setForm({...form, password: e.target.value})} 
          required
        />
        <Button type="submit" className="w-full text-lg py-3">Secure Login</Button>
        <p className="mt-6 text-center text-gray-500">
          New User? <Link to="/register" className="text-primary font-bold hover:text-indigo-600 transition">Create an Account</Link>
        </p>
      </form>
    </div>
  );
};
export default Login;