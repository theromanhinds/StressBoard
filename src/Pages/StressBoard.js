import React, { useState, useEffect } from 'react'
import NavBar from '../Components/NavBar'
import StressCard from '../Components/StressCard'
import StressCards from '../Components/StressCards';

import { nanoid } from 'nanoid';
import { db, auth } from '../FirebaseConfig.js';
import { doc, setDoc, addDoc, collection, updateDoc } from 'firebase/firestore';

import '../App.css';

//renders the main page component the user uses
function StressBoard({signOut}) {

  //dynamic array of StressCard data
  const [cards, setCards] = useState([
    // {
    //   id: nanoid(),
    //   text: "I'm a new Stress!",
    //   selected: false,
    //   typing: false
    // },
    // {
    //   id: nanoid(),
    //   text: "I'm another Stress!",
    //   selected: false,
    //   typing: false
    // },
    // {
    //   id: nanoid(),
    //   text: "I'm your biggest Stress!",
    //   selected: false,
    //   typing: false
    // }
  ])
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    setCurrentUser(localStorage.getItem("uid"));
  }, []);

  function updateSelected(id) {
    setCards(cards.map(card => {
      if (card.id === id) {
        return {...card, selected: true};
      } else {
        return {...card, selected: false};
      }
    }))
  }

  //initializes new StressCards array and replaces state
  async function addCard() {

    const newCard = {
      id: nanoid(),
      text: "I'm a new stress.",
      selected: true,
      typing: false,
    }

    cards.map(card => {
      if (card.selected === true) {
        setCards(...cards, card.selected = false);
      }
    })

    const newCards = [...cards, newCard];
    setCards(newCards);

    await setDoc(doc(db, "users", `${currentUser}`,"cards", `${newCard.id}`), newCard);
    
  }
  
  function handleChange(e) {
    let cardID = "";
    let cardText = e.target.value;
    setCards(cards.map(card => {
      if (card.selected === true) {
        cardID = card.id;
        return {...card, text: e.target.value}
      } else {
        return card;
      }
    }))
    updateCard(cardID, cardText);
  }

  async function updateCard(cardID, cardText){
    await updateDoc(doc(db, "users", `${currentUser}`, "cards", `${cardID}`), {
      text: cardText
    })
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
  };

  function deselect(event) {
    if (event.target === event.currentTarget) {
      setCards(cards.map(card => {
        return {...card, selected: false};
      }))
    }
  };

  return (
    <div className='Board'>
        <NavBar addCard={addCard} signOut={signOut}/>
        <div className='BoardAreaDiv'>
          <StressCards deselect={deselect} cards={cards}
          updateSelected={updateSelected} handleChange={handleChange}
          handleFocus={handleFocus} handleBlur={handleBlur}/>
        </div>
    </div>
  )
}

export default StressBoard