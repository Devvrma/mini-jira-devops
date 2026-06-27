import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description || 'No description provided.'}</p>
      <Link to={`/projects/${project.id}/tasks`} className="inline-block text-blue-600 font-medium text-sm hover:underline">View Board &rarr;</Link>
    </div>
  );
};

export default ProjectCard;
