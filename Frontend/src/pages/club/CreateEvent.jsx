import { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Icons = {
  Calendar: () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  MapPin: () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Users: () => <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Upload: () => <svg className="w-8 h-8 text-indigo-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
};

const FormInput = ({ label, icon: Icon, ...props }) => (
  <div className="w-full">
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">{label}</label>
    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-all">
      {Icon && <Icon />}
      <input className={`w-full outline-none text-gray-700 ${Icon ? 'ml-3' : ''}`} {...props} />
    </div>
  </div>
);

const SuccessAnimation = () => (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
    <style>{`
      .checkmark-circle { stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 2; stroke-miterlimit: 10; stroke: #10B981; fill: none; animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
      .checkmark { width: 80px; height: 80px; border-radius: 50%; display: block; stroke-width: 2; stroke: #fff; stroke-miterlimit: 10; box-shadow: inset 0px 0px 0px #10B981; animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both; }
      .checkmark-check { transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards; }
      @keyframes stroke { 100% { stroke-dashoffset: 0; } }
      @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
      @keyframes fill { 100% { box-shadow: inset 0px 0px 0px 50px #10B981; } }
    `}</style>
    <div className="checkmark mb-6">
      <svg className="checkmark-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
        <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
      </svg>
    </div>
    <h2 className="text-3xl font-bold text-gray-800 animate-pulse">Event Created Successfully!</h2>
    <p className="text-gray-500 mt-2">Redirecting to Events...</p>
  </div>
);

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', location: '', capacity: '', clubId: '',
  });

  useEffect(() => {
    if (user?.clubId || user?._id) {
      setFormData(prev => ({ ...prev, clubId: user.clubId || user._id }));
    }
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const activeClubId = formData.clubId || user?.clubId || user?._id;

    if (!activeClubId) return toast.error('Missing Club ID. Please re-login.');
    if (!bannerImage) return toast.error('Please upload a banner image!');

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('bannerImage', bannerImage); 
      data.append('clubId', activeClubId);
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('location', formData.location);
      data.append('capacity', formData.capacity);
      data.append('date', formData.date);

      await api.post('/events', data, { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      });

      setShowSuccess(true);
      setTimeout(() => { navigate('/club/manage-events'); }, 2000);

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create event');
      setSubmitting(false);
    }
  };

  if (showSuccess) return <SuccessAnimation />;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Create New Event</h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          <div className="w-full lg:w-2/3 p-6 sm:p-8 space-y-6">
            <FormInput name="title" label="Event Title" placeholder="Ex: Tech Symposium" onChange={handleChange} required />
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Description</label>
              <textarea name="description" rows="5" placeholder="Event details..." onChange={handleChange} required 
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormInput 
                name="date" 
                type="datetime-local" 
                label="Date & Time" 
                icon={Icons.Calendar} 
                min={getCurrentDateTime()} 
                onChange={handleChange} 
                required 
              />
              <FormInput name="location" label="Location" icon={Icons.MapPin} placeholder="Hall A" onChange={handleChange} required />
              <FormInput name="capacity" type="number" label="Capacity" icon={Icons.Users} placeholder="100" onChange={handleChange} required />
            </div>
          </div>
          <div className="w-full lg:w-1/3 bg-gray-50 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col gap-6">
            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-bold text-gray-800 mb-2 text-center">Banner Image</label>
              <label className={`flex-1 w-full min-h-[250px] border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden relative
                  ${imagePreview ? 'border-indigo-500' : 'border-gray-300 hover:bg-indigo-50'}`}>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover absolute inset-0" /> : (
                  <>
                    <Icons.Upload />
                    <span className="text-sm text-gray-500">Upload Image</span>
                  </>
                )}
              </label>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
               <p className="text-xs text-blue-700 font-medium uppercase tracking-tight">Publishing as:</p>
               <p className="text-sm font-bold text-blue-900">{user?.name || "Loading club details..."}</p>
            </div>
            <button type="submit" disabled={submitting} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition shadow-lg disabled:opacity-50">
              {submitting ? 'Processing...' : 'Publish Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;