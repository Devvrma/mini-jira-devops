import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Mini-Jira</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full p-2.5 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full p-2.5 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded transition">Sign In</button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link></p>
    </div>
  );
};

export default Login;
