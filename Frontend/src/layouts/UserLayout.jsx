import Navbar from '../components/layout/Navbar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-dark text-gray-400 text-center p-6 text-sm border-t border-gray-700">
        © 2025 EventEase - University Project. Built with MERN Stack.
      </footer>
    </div>
  );
};
export default UserLayout;