import React from 'react';

function SignedOut({signInWithGoogle}) {
  
  return (
    <div>
        <h1>You are signed out! Sign in below:</h1>
        <button onClick={() => signInWithGoogle()}>Sign In</button>
    </div>
  )
}

export default SignedOut