import { useState } from 'react';
import './App.css';

import StressBoard from './Pages/StressBoard';
import SignedOut from './Pages/SignedOut';

function App() {

  const [signedIn, setSignedIn] = useState(true);

  function signHandler() {
    setSignedIn(current => !current);
  }

  return (
    <div className="App">
      {signedIn ? <StressBoard signHandler={signHandler}/> : <SignedOut signHandler={signHandler}/>}
    </div>
    
  );
}

export default App;