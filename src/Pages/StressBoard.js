import React, { useState, useEffect } from 'react'
import NavBar from '../Components/NavBar'
import StressCards from '../Components/StressCards';

import { nanoid } from 'nanoid';
import { db } from '../FirebaseConfig.js';
import { query, doc, collection, setDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

import '../App.css';

//renders the main page component the user uses
function StressBoard({signOut}) {

  //dynamic array of StressCard data
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState('');

  // GETS USER LOGIN FROM LOCAL STORAGE
  useEffect(() => {
    setCurrentUser(localStorage.getItem("uid"));
    getCards();
  }, []);

  //FOCUSES CARD TEXTAREA ON DOUBLE CLICK
  function enableTyping(id) {
    setCards(cards.map(card => {
      if (card.id === id) {
        return {...card, typing: true};
      } else {
        return {...card, typing: false};
      }
    }))
  }

  async function getCards() {
    const docSnap = await getDocs(query(collection(db, "users", `${localStorage.getItem("uid")}`, "cards")));
    let cards = [];
    docSnap.forEach((doc) => {
      cards.push(doc.data());
    })
    setCards(cards);
  }

  //GENERATES NEW CARD AND ADDS TO FIRESTORE
  async function addCard() {

    if (cards.length > 9){
      return;
    }

    const newCard = {
      id: nanoid(),
      text: "I'm a new stress.",
      completed: false,
      typing: true,
    }

    const newCards = [...cards, newCard];
    setCards(newCards);

    await setDoc(doc(db, "users", `${currentUser}`,"cards", `${newCard.id}`), {
      id: newCard.id,
      text: newCard.text,
      completed: newCard.completed
    });
  }
  
  //HANDLES TEXT CHANGE, CALLS updateCard()
  function handleChange(e) {
    let cardID = "";
    let cardText = e.target.value;
    let cardCompletion = false;
    setCards(cards.map(card => {
      if (card.typing === true) {
        cardID = card.id;
        cardCompletion = card.completed;
        return {...card, text: e.target.value}
      } else {
        return card;
      }
    }))
    updateCard(cardID, cardText, cardCompletion);
  }

  //UPDATES FIRESTORE CARD DATA
  async function updateCard(cardID, cardText, cardCompletion){
    if (cardID) {
      await updateDoc(doc(db, "users", `${currentUser}`, "cards", `${cardID}`), {
        id: cardID,
        text: cardText,
        completed: cardCompletion
      })
    }
  }

  //RESETS TYPING TO FALSE AFTER TEXTAREA BLUR
  function handleBlur(id) {
    setCards(cards.map(card => {
      if (card.id === id) {
        return {...card, typing: false}
      } else {
        return card;
      }
    }))
  };

  //HANDLES COMPLETE CHANGE, CALLS updatedCard()
  function completeCard(id){
    let cardID = "";
    let cardText = "";
    let cardCompletion = false;
    setCards(cards.map(card => {
      if (card.id === id) {
        cardID = card.id;
        cardText = card.text;
        cardCompletion = true;
        if (card.completed === true){
          cardCompletion = false;
          return {...card, completed: false}
        }
        return {...card, completed: true}
      } else {
        return card;
      }
    }))
    updateCard(cardID, cardText, cardCompletion);
  };

  //DELETES CARD FROM ARRAY AND FIRESTORE
  async function deleteCard(id) {
    const filteredCards = cards.filter(card => card.id !== id);
    setCards(filteredCards);

    await deleteDoc(doc(db, "users", `${currentUser}`, "cards", `${id}`));
  };

  return (
    <div className='Board'>

        <NavBar addCard={addCard} signOut={signOut}/>

        <div className='BoardAreaDiv'>

          <StressCards cards={cards}
            handleChange={handleChange}
            handleBlur={handleBlur}
            enableTyping={enableTyping}
            completeCard={completeCard}
            deleteCard={deleteCard}/>

        </div>

        
    </div>
  )
}

export default StressBoard