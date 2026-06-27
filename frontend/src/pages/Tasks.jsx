import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import TaskCard from '../components/TaskCard';

const Tasks = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const fetchTasks = () => {
    API.get(`/tasks/project/${projectId}`).then(res => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/tasks/project/${projectId}`, { title, description: desc });
      setTitle(''); setDesc('');
      fetchTasks();
    } catch (err) { alert('Failed to create task'); }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await API.put(`/tasks/${taskId}/status?status=${newStatus}`);
      fetchTasks();
    } catch (err) { alert('Failed to update task'); }
  };

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <div className="bg-white p-6 rounded-lg shadow mb-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Add New Task to Board</h3>
        <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:flex items-center gap-4">
          <input type="text" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} required className="flex-1 p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500" />
          <input type="text" placeholder="Task Description" value={desc} onChange={e => setDesc(e.target.value)} className="flex-1 p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500" />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-medium transition">Add Task</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TODO COLUMN */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="flex items-center justify-between mb-4 border-b pb-2"><h3 className="font-bold text-gray-700 uppercase text-sm">📋 To Do</h3></div>
          <div className="space-y-3">{tasks.filter(t => t.status === 'TODO').map(t => <TaskCard key={t.id} task={t} onStatusChange={handleStatusChange} />)}</div>
        </div>

        {/* PROGRESS COLUMN */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="flex items-center justify-between mb-4 border-b pb-2"><h3 className="font-bold text-yellow-600 uppercase text-sm">⏳ In Progress</h3></div>
          <div className="space-y-3">{tasks.filter(t => t.status === 'IN_PROGRESS').map(t => <TaskCard key={t.id} task={t} onStatusChange={handleStatusChange} />)}</div>
        </div>

        {/* DONE COLUMN */}
        <div className="bg-white p-4 rounded-lg shadow border border-gray-100">
          <div className="flex items-center justify-between mb-4 border-b pb-2"><h3 className="font-bold text-green-600 uppercase text-sm">✅ Done</h3></div>
          <div className="space-y-3">{tasks.filter(t => t.status === 'DONE').map(t => <TaskCard key={t.id} task={t} onStatusChange={handleStatusChange} />)}</div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
