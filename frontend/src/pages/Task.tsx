import { useNavigate, useParams } from 'react-router-dom';
import { useTask } from '../hooks';
import TaskCard from '../components/TaskCard';
import { deleteTask } from '../hooks';
export default function Task() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { loading, task } = useTask(id ?? '');

  const handleComplete = async (taskId: number) => {
    console.log(`Task with id ${taskId} marked as completed`);
    // Add logic to mark the task as completed
    try {
      await deleteTask(taskId);
      console.log(`Task with id ${taskId} deleted successfully`);
      navigate('/tasks');
      // Optionally, you can perform some action after the task is deleted, like refreshing the task list
    } catch (error) {
      console.error('Error deleting task:', error);
      // Optionally, you can handle errors here, like displaying an error message to the user
    }
  };

  if (!id) {
    return <div>Error: Task ID is missing.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found.</div>;
  }

  return (
    <div>
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
