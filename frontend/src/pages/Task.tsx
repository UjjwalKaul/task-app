import { useParams } from 'react-router-dom';
import { useTask } from '../hooks';
import TaskCard from '../components/TaskCard';

export default function Task() {
  const { id } = useParams<{ id: string }>();

  const { loading, task } = useTask(id ?? '');

  const handleComplete = (taskId: number) => {
    console.log(`Task with id ${taskId} marked as completed`);
    // Add logic to mark the task as completed
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
