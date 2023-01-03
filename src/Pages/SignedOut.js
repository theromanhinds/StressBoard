import React from 'react'

function SignedOut({signHandler}) {
    
  return (
    <div>
        <h1>You are signed out! Sign in below:</h1>
        <button onClick={() => signHandler()}>Sign In</button>
    </div>
  )
}

export default SignedOut