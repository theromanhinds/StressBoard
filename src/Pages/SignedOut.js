import React from 'react';

function SignedOut({signInWithGoogle}) {

  return (
    <div className='SignedOut'>
        <img className='SplashLogo' src="/StessBoardLogo.png" alt="StressBoard Logo"/>
        <h1 className='SplashHeader'>Welcome to StressBoard by HERO</h1>
        <h3 className='SplashText'>Please sign in below:</h3>
        <button className='SignInButton' onClick={() => signInWithGoogle()}>Sign In</button>
    </div>
  )
}

export default SignedOut