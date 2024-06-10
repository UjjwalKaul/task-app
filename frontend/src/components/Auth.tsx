import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { SignupInput } from '../../../common/types';
export default function Auth({ type }: { type: 'signup' | 'signin' }) {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: '',
    email: '',
    password: '',
  });
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div>
            <div className="text-3xl font-extrabold mt-4">
              {type === 'signin' ? 'Login to Account' : 'Create an Account'}
            </div>
            <div className="text-slate-500">
              {type === 'signin'
                ? "Don't have an account"
                : 'Already have an account?'}
              <Link
                className="pl-2 text-center underline"
                to={type === 'signin' ? '/signup' : '/signin'}>
                {type === 'signin' ? 'Sign up' : 'Sign in'}
              </Link>
            </div>
          </div>
          <div>
            {type === 'signup' ? (
              <LabelledInput
                label="Name"
                placeholder="Ujjawal Kaul "
                onChange={(e) => {
                  setPostInputs({ ...postInputs, name: e.target.value });
                }}
              />
            ) : null}
            <LabelledInput
              label="Email ID"
              placeholder="email@gmail.com"
              onChange={(e) => {
                setPostInputs((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
            <LabelledInput
              label="Password"
              type="password"
              placeholder="******"
              onChange={(e) => {
                setPostInputs((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
            <button
              onClick={() => {}}
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              {type === 'signup' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-bold text-black pt-4 ">
        {label}
      </label>
      <input
        type={type || 'text'}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
}
