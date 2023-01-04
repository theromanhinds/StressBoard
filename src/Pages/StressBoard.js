import React, { useState } from 'react'
import NavBar from '../Components/NavBar'
import StressCard from '../Components/StressCard'
import StressCards from '../Components/StressCards';

import { nanoid } from 'nanoid';

import '../App.css';

//renders the main page component the user uses
function StressBoard({signOut}) {

  //dynamic array of StressCard data
  const [cards, setCards] = useState([
    {
      id: nanoid(),
      text: "I'm a new Stress!",
      selected: false,
      typing: false
    },
    {
      id: nanoid(),
      text: "I'm another Stress!",
      selected: false,
      typing: false
    },
    {
      id: nanoid(),
      text: "I'm your biggest Stress!",
      selected: false,
      typing: false
    }
  ])

  function updateSelected(id) {
    console.log(`${id} is selected`);

    setCards(cards.map(card => {
      if (card.id === id) {
        return {...card, selected: true};
      } else {
        return {...card, selected: false};
      }
    }))
  }

  //initializes new StressCards array and replaces state
  function addCard(event) {
    if (event.target === event.currentTarget) {
      
      console.log("Board Selected!");
    //   const newCard = {
    //     id: nanoid(),
    //     text: "I'm an additional Stress!",
    //     selected: false,
    //     typing: false
    //   }
    //   const newCards = [...cards, newCard];
    //   setCards(newCards);
    // }
      
    setCards(cards.map(card => {
        return {...card, selected: false};
    }))
      
    }
  }

  function handleChange(e) {
    setCards(cards.map(card => {
      if (card.selected === true) {
        return {...card, text: e.target.value}
      } else {
        return card;
      }
      
    }))
  }

  function handleFocus(id) {
    setCards(cards.map(card => {
      if (card.id === id) {
        return {...card, typing: true}
      } else {
        return card;
      }
    }))
  }

  function handleBlur(id) {
    setCards(cards.map(card => {
      if (card.id === id) {
        return {...card, typing: false}
      } else {
        return card;
      }
    }))
  }

  return (
    <div className='Board'>
        <NavBar signOut={signOut}/>
        <div className='BoardAreaDiv'>
          <StressCards addCard={addCard} cards={cards}
          updateSelected={updateSelected} handleChange={handleChange}
          handleFocus={handleFocus} handleBlur={handleBlur}/>
        </div>
    </div>
  )
}

export default StressBoard