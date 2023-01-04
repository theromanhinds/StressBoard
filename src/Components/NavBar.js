import React from 'react'
import '../App.css'

function NavBar({signOut}) {
  return (
    <div className='NavBarDiv'>
        <h1>NavBar</h1>
        <button className='SignButton' onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default NavBar