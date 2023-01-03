import React from 'react'
import '../App.css'

function NavBar({signHandler}) {
  return (
    <div className='NavBarDiv'>
        <h1>NavBar</h1>
        <button className='SignButton' onClick={() => signHandler()}>Sign Out</button>
    </div>
  )
}

export default NavBar