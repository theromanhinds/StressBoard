import { useState } from 'react';
import './App.css';

import StressBoard from './Pages/StressBoard';
import SignedOut from './Pages/SignedOut';

function App() {

  const [signedIn, setSignedIn] = useState(true);

  return (
    <div className="App">
      {signedIn ? <StressBoard/> : <SignedOut/>}
    </div>
    
  );
}

export default App;