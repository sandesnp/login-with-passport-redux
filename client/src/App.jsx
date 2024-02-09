import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from './redux/userSlice';
import { addMessage } from './redux/messageSlice';

export default function App() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const MESSAGE = useSelector((state) => state.Message);
  const handleData = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(userLogin(user));

      if (!response.payload?.mission) {
        console.log(1, response.payload.package);
        dispatch(addMessage(response.payload?.package));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (page === 1) return <div>Home</div>;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          name='username'
          onChange={handleData}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          onChange={handleData}
        />
        <button>Submit</button>
      </form>
      {MESSAGE}
    </div>
  );
}
