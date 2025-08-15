import { createContext, useState } from 'react';

// Create the context
export const userAuthorContextObj = createContext();

function UserAuthorProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImageUrl: '',
    role: ''
  });

  return (
    <userAuthorContextObj.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </userAuthorContextObj.Provider>
  );
}

export default UserAuthorProvider;
