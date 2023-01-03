import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import StressCard from '../Components/StressCard'
import StressCards from '../Components/StressCards';

import { nanoid } from 'nanoid';

import '../App.css';

//renders the main page component the user uses
function StressBoard() {

  //dynamic array of StressCard data
  const [cards, setCards] = useState([
    {
      text: "I'm a new Stress!",
    }
  ])

  //initializes new StressCards array and replaces state
  function addCard() {
    const newCard = {
      text: "I'm a new Stress!"
    }
    const newCards = [...cards, newCard];
    setCards(newCards);
  }

  return (
    <div className='Board'>
        <NavBar/>
        <div className='BoardAreaDiv'>
          <div className='BoardArea' onClick={addCard}>
            <StressCards cards={cards}/>
          </div>
        </div>
    </div>
  )
}

export default StressBoard