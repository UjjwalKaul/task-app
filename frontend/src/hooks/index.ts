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
  return { loading, tasks };
}

export function useTask(id: string) {
  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState<Task>();
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/task/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
      .then((response) => {
        setTask(response.data.task);
        setLoading(false);
      });
  }, [id]);
  return { loading, task };
}
