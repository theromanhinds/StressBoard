import { React, useEffect, useState } from 'react';
import './App.css';

import StressBoard from './Pages/StressBoard';
import SignedOut from './Pages/SignedOut';

import { auth, provider } from './FirebaseConfig.js';
import { signInWithPopup } from 'firebase/auth';

function App() {

  // holds user object collected from Firebase authorization
  const [user, setUser] = useState('');

  // gets user object from local storage on page reload
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [])

  // displays Google sign in pop-up and collects user info
  function signInWithGoogle() {
    signInWithPopup(auth, provider).then((result) => {
      setUser(result);
      localStorage.setItem("user", result);
      localStorage.setItem("uid", result.user.uid);
    }).catch((error) => {
      console.log(error);
    })
  }

  // clears user object from local storage and triggers signedOut page render
  function signOut() {
    localStorage.clear();
    window.location.reload();
  }

  // renders signedOut page if user null, else StressBoard
  return (
    <div className="App">
      {user ? <StressBoard signOut={signOut}/> : <SignedOut signInWithGoogle={signInWithGoogle}/>}
    </div>
    
  );
}

export default App;