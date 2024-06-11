import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
  dueDate: string;
}

export default function useTasks() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/task/bulk`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setTasks(response.data.tasks);
        setLoading(false);
      });
  }, []);
  console.log(tasks);
  return { loading, tasks };
}
