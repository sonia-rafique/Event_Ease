import { useState } from 'react';

const RegistrationModal = ({ event, user, onClose, onConfirm, submitting }) => {
   
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        enrollmentId: '',
        phone: '',
        department: 'CS',
        semester: '1'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
                <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Register for {event.title}</h2>
                    <button onClick={onClose} className="text-white hover:bg-indigo-700 p-1 rounded-full transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                            <input type="text" value={formData.name} disabled className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 text-gray-600 cursor-not-allowed" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                            <input type="text" value={formData.email} disabled className="w-full bg-gray-100 border border-gray-300 rounded px-3 py-2 text-gray-600 cursor-not-allowed" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Student ID <span className="text-red-500">*</span></label>
                            <input
                                name="enrollmentId"
                                required
                                placeholder="XX-XXXXX"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
                            <input
                                name="phone"
                                required
                                placeholder="0300-1234567"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <select
                                name="department"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                onChange={handleChange}
                            >
                                <option value="CS">Computer Science</option>
                                <option value="SE">Software Eng.</option>
                                <option value="BBA">Business (BBA)</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Media">Media Science</option>
                                <option value="IT">Information Technology</option>
                                <option value="AI">Artificial Intelligence</option>
                                <option value="Robotics">Robotics & Intelligent Systems</option>
                                <option value="SupplyChain">Supply Chain Management</option>
                                <option value="BusinessAnalytics">Business Analytics</option>
                                <option value="AccountingFinance">Accounting & Finance</option>
                                <option value="Economics">Economics & Finance</option>
                                <option value="MaritimeBusiness">Maritime Business & Management</option>
                                <option value="PublicHealth">Public Health</option>
                                <option value="EnvironmentalScience">Environmental Sciences</option>
                                <option value="RemoteSensingGIS">Remote Sensing & GIS</option>
                                <option value="SocialSciences">Social Sciences</option>
                                <option value="Psychology">Psychology</option>
                                <option value="English">English</option>
                                <option value="LLB">Law (LLB)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                            <select
                                name="semester"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                    <option key={sem} value={sem}>{sem}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                            Cancel
                        </button>
                        <button type="submit" disabled={submitting} className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-lg disabled:opacity-50">
                            {submitting ? 'Registering...' : 'Confirm Registration'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationModal;