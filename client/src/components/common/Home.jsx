import { useContext, useEffect, useState } from 'react';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pic from '../../assets/home.jpeg';

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded } = useUser();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function onSelectRole(e) {
    setError('');
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;

    try {
      const endpointMap = {
        author: 'http://localhost:3000/author-api/author',
        user: 'http://localhost:3000/user-api/user',
        admin: 'http://localhost:3000/admin-api/admin',
      };

      const res = await axios.post(endpointMap[selectedRole], currentUser);
      const { message, payload } = res.data;

      if (message === selectedRole) {
        setCurrentUser({ ...currentUser, ...payload });
        localStorage.setItem('currentuser', JSON.stringify(payload));
      } else {
        setError(message);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [
    isLoaded,
    currentUser,
    isSignedIn,
    setCurrentUser,
    user.emailAddresses,
    user.firstName,
    user.imageUrl,
    user.lastName
  ]);

  useEffect(() => {
    if (currentUser?.role && error.length === 0) {
      navigate(`/${currentUser.role}-profile/${currentUser.email}`);
    }
  }, [currentUser, error.length, navigate]);

  return (
    <div className='container'>
      {!isSignedIn && (
        <div>
          <div className="w-100 d-flex justify-content-center">
            <img
              src={pic}
              alt="home"
              className="w-100 d-block mb-5"
              style={{ height: '50vh', objectFit: 'cover' }}
            />
          </div>

          <h1 className="display-4 fw-bold text-primary text-center mb-5">
            Welcome to the Blog App
          </h1>
          <p className="text-muted fs-5 text-center">
            Explore insightful articles, share your knowledge, and engage with a community of writers and readers.
          </p>
        </div>
      )}

      {isSignedIn && (
        <div>
          <div className='d-flex justify-content-evenly align-items-center bg-info p-3'>
            <img src={user.imageUrl} width="100px" className='rounded-circle' alt="" />
            <p className="display-6">{user.firstName}</p>
            <p className="lead">{user.emailAddresses[0].emailAddress}</p>
          </div>

          <p className="lead">Select role</p>
          {error && <p className="text-danger fs-5" style={{ fontFamily: 'sans-serif' }}>{error}</p>}

          <div className='d-flex role-radio py-3 justify-content-center'>
            {['author', 'user', 'admin'].map((role) => (
              <div key={role} className="form-check me-4">
                <input
                  type="radio"
                  name="role"
                  id={role}
                  value={role}
                  className="form-check-input"
                  onChange={onSelectRole}
                />
                <label htmlFor={role} className="form-check-label text-capitalize">
                  {role}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
