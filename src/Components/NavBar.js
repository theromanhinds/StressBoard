import React from 'react'
import '../App.css'

function NavBar({signOut, addCard}) {

  return (
    <div className='NavBarDiv'>
      <button className='AddButton' onClick={() => addCard()}>Add Stress</button>
      <img className='Logo' src="/StessBoardLogo.png" alt="StressBoard Logo"/>
      <button className='SignOutButton' onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default NavBar