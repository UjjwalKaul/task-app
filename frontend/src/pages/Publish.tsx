import axios from 'axios';
import AppBar from '../components/Appbar';
import { BACKEND_URL } from '../config';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Publish() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  return (
    <div>
      <AppBar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full ">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="mb-2 bg-gray-100 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 "
            placeholder="Title"
          />
          <TextEditor
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              await axios.post(
                `${BACKEND_URL}/api/v1/task`,
                {
                  title,
                  description,
                  status: false,
                },
                { headers: { Authorization: localStorage.getItem('token') } }
              );
              navigate(`/tasks`);
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <form>
      <div className="w-full mb-4 ">
        <div className="flex items-center justify-between  border-b">
          <div className=" bg-white  w-full">
            <textarea
              onChange={onChange}
              id="editor"
              rows={10}
              className=" border border-gray-500 block w-full text-sm text-gray-800 bg-gray-100 p-3 rounded-lg"
              placeholder="Describe your task"
              required
            />
          </div>
        </div>
      </div>
    </form>
  );
}
