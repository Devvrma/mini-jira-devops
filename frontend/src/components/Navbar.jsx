import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold tracking-wider">🚀 MINI-JIRA</Link>
        <div className="flex items-center space-x-6">
          <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
          <Link to="/projects" className="hover:text-blue-200">Projects</Link>
          <button onClick={() => { logout(); navigate('/login'); }} className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded text-sm font-medium transition">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
