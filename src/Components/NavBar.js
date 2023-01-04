import React from 'react'
import '../App.css'

function NavBar({signOut, addCard}) {

  return (
    <div className='NavBarDiv'>
      <button onClick={() => addCard()}>Add Stress</button>
      <img className='Logo' src="/StessBoardLogo.png" alt="StressBoard Logo"/>
      <button className='SignButton' onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default NavBar