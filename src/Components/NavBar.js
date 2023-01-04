import React from 'react'
import '../App.css'

function NavBar({signOut, addCard}) {

  return (
    <div className='NavBarDiv'>
        <h1>NavBar</h1>
        <button onClick={() => addCard()}>Add Stress</button>
        <button className='SignButton' onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default NavBar