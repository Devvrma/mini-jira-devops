const TaskCard = ({ task, onStatusChange }) => {
  return (
    <div className="bg-gray-50 p-4 rounded border border-gray-200 shadow-sm hover:shadow transition">
      <h4 className="font-medium text-gray-800 mb-1">{task.title}</h4>
      <p className="text-gray-500 text-xs mb-3">{task.description || 'No description.'}</p>
      <div className="flex justify-end space-x-1">
        {task.status !== 'TODO' && (
          <button onClick={() => onStatusChange(task.id, 'TODO')} className="text-[10px] bg-gray-200 hover:bg-gray-300 px-2 py-0.5 rounded text-gray-700">TODO</button>
        )}
        {task.status !== 'IN_PROGRESS' && (
          <button onClick={() => onStatusChange(task.id, 'IN_PROGRESS')} className="text-[10px] bg-yellow-100 hover:bg-yellow-200 px-2 py-0.5 rounded text-yellow-800">DOING</button>
        )}
        {task.status !== 'DONE' && (
          <button onClick={() => onStatusChange(task.id, 'DONE')} className="text-[10px] bg-green-100 hover:bg-green-200 px-2 py-0.5 rounded text-green-800">DONE</button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
