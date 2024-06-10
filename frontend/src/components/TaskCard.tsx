import React from 'react';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  status: boolean;
  dueDate: string;
  onComplete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  status,
  dueDate,
  onComplete,
}) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal shadow-md">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-gray-600">
              Due: {new Date(dueDate).toLocaleDateString()}
            </p>
            <p
              className={`mt-2 ${
                status === true ? 'text-green-500' : 'text-red-500'
              }`}>
              Status: {status === true ? 'Completed' : 'Pending'}
            </p>
          </div>
          {status !== true && (
            <button
              onClick={() => onComplete(id)}
              className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Mark as Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
