import { useState, useEffect } from 'react';
import API from '../services/api';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    API.get('/dashboard/summary')
      .then(res => setSummary(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!summary) return <div className="text-center mt-10">Loading Stats...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Mini-Jira Metrics</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Total Projects</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{summary.total_projects}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Tasks To Do</h3>
          <p className="text-3xl font-bold text-gray-600 mt-2">{summary.tasks_summary.todo}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">In Progress</h3>
          <p className="text-3xl font-bold text-yellow-500 mt-2">{summary.tasks_summary.in_progress}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Completed Tasks</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{summary.tasks_summary.done}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
