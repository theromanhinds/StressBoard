import { React, useEffect, useState } from 'react';
import './App.css';

import StressBoard from './Pages/StressBoard';
import SignedOut from './Pages/SignedOut';

import { auth, provider } from './FirebaseConfig.js';
import { signInWithPopup } from 'firebase/auth';


function App() {

  const [user, setUser] = useState('');

  function signInWithGoogle() {
    signInWithPopup(auth, provider).then((result) => {
      setUser(result);
      localStorage.setItem("user", result);
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  })

  function signOut() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="App">
      {user ? <StressBoard signOut={signOut}/> : <SignedOut signInWithGoogle={signInWithGoogle}/>}
    </div>
    
  );
}

export default App;