import { React, useState, useEffect } from 'react'

import NavBar from '../Components/NavBar'
import StressCards from '../Components/StressCards';

import { nanoid } from 'nanoid';
import { db } from '../FirebaseConfig.js';
import { query, doc, collection, setDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

import '../App.css';

//renders stressboard page on user sign in
function StressBoard({signOut}) {

  // holds card objects list
  const [cards, setCards] = useState('');

  // holds user id string
  const [currentUser, setCurrentUser] = useState('');

  // gets current user id from local storage and calls getCards
  useEffect(() => {
    setCurrentUser(localStorage.getItem("uid"));
    getCards();
  }, []);

  // gets card objects using currentUser id and calls setCards
  async function getCards() {
    // [!!!] getDocs reads currentUser as null after useEffect
    // while later functions will accept currentUser [!!!]
    const docSnap = await getDocs(query(collection(db, "users", `${localStorage.getItem("uid")}`, "cards")));
    let results = [];
    docSnap.forEach((doc) => {
      results.push(doc.data());
    })
    setCards(results);
  }

  // sets typing state to true for selected card, false for others
  function enableTyping(id) {
    setCards(cards.map(card => {
      if (card.id === id) {
        return {...card, typing: true};
      } else {
        return {...card, typing: false};
      }
    }))
  }

  // creates new card object, updates state list, adds card to database
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
  
  // handles text change for selected card, calls updateCard
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

  // handles complete toggle for clicked Card, calls update Card
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

  // updates database for selected card
  async function updateCard(cardID, cardText, cardCompletion){
    if (cardID) {
      await updateDoc(doc(db, "users", `${currentUser}`, "cards", `${cardID}`), {
        id: cardID,
        text: cardText,
        completed: cardCompletion
      })
    }
  }

  // deletes card from state list and database
  async function deleteCard(id) {
    const filteredCards = cards.filter(card => card.id !== id);
    setCards(filteredCards);

    await deleteDoc(doc(db, "users", `${currentUser}`, "cards", `${id}`));
  };

  // sets card typing to false on textarea blur
  function handleBlur(id) {
    setCards(cards.map(card => {
      if (card.id === id) {
        return {...card, typing: false}
      } else {
        return card;
      }
    }))
  };

  return (
    <div className='Board'>

        <NavBar totalCards={cards.length} addCard={addCard} signOut={signOut}/>

        <div className='BoardAreaDiv'>

        {cards ? <StressCards cards={cards}
            handleChange={handleChange}
            handleBlur={handleBlur}
            enableTyping={enableTyping}
            completeCard={completeCard}
            deleteCard={deleteCard}/> : <h1>LOADING</h1>}
          
        </div>

        
    </div>
  )
}

export default StressBoard