import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// LAYOUTS
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import ClubLayout from './layouts/ClubLayout';

// PAGES
import Home from './pages/Home';

// AUTH PAGES
import Login from './pages/auth/Login'; 
import Register from './pages/auth/Register';

// STUDENT PAGES
import EventFeed from './pages/Student/EventFeed';

// ADMIN PAGES
import Dashboard from './pages/admin/Dashboard';
import ManageClubs from './pages/admin/ManageClubs';
import AdminManageEvents from './pages/admin/ManageEvents';

// CLUB PAGES
import ManageEvents from './pages/club/ManageEvents';
import CreateEvent from './pages/club/CreateEvent';

const App = () => {
  return (
    <>
      <Routes>
        {/* --- PUBLIC / STUDENT ROUTES --- */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="student/feed" element={<EventFeed />} />
        </Route>

        {/* --- CLUB PANEL ROUTES --- */}
        <Route path="/club" element={<ClubLayout />}>
          <Route index element={<Navigate to="/club/manage-events" replace />} />
          <Route path="manage-events" element={<ManageEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
        </Route>

        {/* --- ADMIN PANEL ROUTES --- */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="dashboard" element={<Dashboard />} /> 
          <Route path="manage-clubs" element={<ManageClubs />} /> 
          <Route path="manage-events" element={<AdminManageEvents />} />
        </Route>

        <Route path="*" element={<div className="p-20 text-center text-3xl font-bold">404 - Page Not Found</div>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;