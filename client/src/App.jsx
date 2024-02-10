// Import necessary React hooks and Redux functions
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import action creators from the slices of the Redux store
import { userLogin, userStatus, userLogout } from './redux/userSlice';
import { addMessage } from './redux/messageSlice';

// Define the App component
export default function App() {
  // State hooks for managing user input and page state
  const [user, setUser] = useState({ username: '', password: '' });

  //To display loader when the async requests are being processed
  const [loader, setLoader] = useState(true);

  // Hook to access the Redux dispatch function
  const dispatch = useDispatch();

  // Access the message state from the Redux store
  const MESSAGE = useSelector((state) => state.Message);
  const isAuthenticated = useSelector((state) => state.User.isAuthenticated);

  // Function to update the user state based on form input
  const handleData = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Provide user data to make post request for login
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(userLogin(user))
      .unwrap()
      .catch((rejectedValue) => {
        dispatch(addMessage(rejectedValue.package));
      });
  };

  //log the user out
  const handleLogout = (e) => {
    e.preventDefault();
    setLoader(true);
    dispatch(userLogout())
      .unwrap()
      .then((_) => setLoader(false))
      .catch((_) => setLoader(false));
  };

  //check if the user is already logged in based on the cookie
  useEffect(() => {
    dispatch(userStatus())
      .unwrap()
      .then((_) => {
        setLoader(false);
      })
      .catch((_) => {
        setLoader(false);
      });
  }, []);

  const Homepage = () => (
    <div>
      <h1>Homepage</h1>
      <a href='/' onClick={handleLogout}>
        Logout
      </a>
    </div>
  );

  if (loader) return <div>Loading</div>;

  // Conditional rendering based on the page state or if the user is already authenticated
  if (isAuthenticated) return <Homepage />;

  // Render the form for user input and display the MESSAGE from the Redux store
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
