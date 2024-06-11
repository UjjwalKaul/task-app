import Appbar from '../components/Appbar';
import TaskCard from '../components/TaskCard';
import useTasks from '../hooks';

export default function Tasks() {
  const { loading, tasks } = useTasks();
  if (loading) {
    return <div>loading..</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <Appbar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-3">
        {tasks.map((task) => {
          return (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              dueDate={task.dueDate}
              onComplete={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}
