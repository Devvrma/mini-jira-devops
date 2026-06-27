import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { email, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
      {success && <p className="text-green-600 text-sm mb-4 text-center">Account created! Redirecting to login...</p>}
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
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded transition">Register</button>
      </form>
      <p className="mt-4 text-sm text-center text-gray-600">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link></p>
    </div>
  );
};

export default Register;
