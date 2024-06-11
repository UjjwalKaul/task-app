import { useNavigate, useParams } from 'react-router-dom';
import { useTask } from '../hooks';
import TaskCard from '../components/TaskCard';
import { deleteTask } from '../hooks';
import Skeleton from '../components/Skeleton';
export default function Task() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { loading, task } = useTask(id ?? '');

  const handleComplete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      navigate('/tasks');
    } catch (error) {
      alert('Error deleting task: ' + error);
    }
  };

  if (!id) {
    return <div>Error: Task ID is missing.</div>;
  }

  if (loading) {
    return (
      <div className="flex mt-[10rem] justify-center items-center p-4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (!task) {
    return <div>Task not found.</div>;
  }

  return (
    <div className="flex justify-center mt-[15rem] w-full">
      <TaskCard
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        status={task.status}
        dueDate={task.dueDate}
        onComplete={handleComplete}
      />
    </div>
  );
}
