import { React, useState, useEffect } from 'react'
import '../App.css'

function NavBar({signOut, addCard, totalCards}) {

  const [addButtonText, setAddButtonText] = useState("Add Stress")

  useEffect(() => {
    if (totalCards > 9) {
      setAddButtonText("Max Cards");
    } else {
      setAddButtonText("Add Stress")
    }
  }, [totalCards])

  return (
    <div className='NavBarDiv'>
      <button className='AddButton' onClick={() => addCard()}>{addButtonText}</button>
      <img className='Logo' src="/StessBoardLogo.png" alt="StressBoard Logo"/>
      <button className='SignOutButton' onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default NavBar