import React from 'react'
import StressCard from './StressCard'

import '../App.css'

function StressCards({cards, handleChange, handleBlur, enableTyping, completeCard, deleteCard}) {

  return (
    <div className='StressCardsRange'>

      <img className='Deadline' src="/Deadline.png" alt="Deadline"/>
      <img  className='Importance' src="/Importance.png" alt="Importance"/>

      {cards.map((card) => (
        <StressCard text={card.text}
        key={card.id} 
        id={card.id}
        completed={card.completed}
        typing={card.typing}
        handleChange={handleChange}
        handleBlur={handleBlur}
        enableTyping = {enableTyping}
        completeCard={completeCard}
        deleteCard={deleteCard}/>
      ))}

    </div>
  )
}

export default StressCards