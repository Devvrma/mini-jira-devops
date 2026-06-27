import { useState, useEffect } from 'react';
import API from '../services/api';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const fetchProjects = () => {
    API.get('/projects/').then(res => setProjects(res.data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/projects/', { title, description: desc });
      setTitle(''); setDesc('');
      fetchProjects();
    } catch (err) { alert('Error creating project'); }
  };

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Workspaces</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow border border-dashed border-gray-300 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-700 mb-3">Add New Project</h3>
            <input type="text" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full mb-2 p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500" />
            <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-2 border rounded text-sm focus:ring-1 focus:ring-blue-500" rows="2" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded text-sm transition mt-3">Create Workspace</button>
        </form>
        {projects.map(proj => <ProjectCard key={proj.id} project={proj} />)}
      </div>
    </div>
  );
};

export default Projects;
