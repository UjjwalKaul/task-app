import TaskCard from '../components/TaskCard';

export default function Tasks() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskCard
          id="1"
          title="My Task"
          description="Mytask"
          status={false}
          dueDate="01-02-2024"
          onComplete={() => {}}
        />
      </div>
    </div>
  );
}
