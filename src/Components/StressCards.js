import React from 'react'
import StressCard from './StressCard'

import '../App.css'

function StressCards({cards, handleTyping, handleBlur, enableTyping, completeCard, deleteCard, handlePosition}) {

  return (
    <div className='StressCardsRange'>

      <img className='Deadline' src="/Deadline.png" alt="Deadline"/>
      <img  className='Importance' src="/Importance.png" alt="Importance"/>
      <div className='Vertical'></div>
      <div className='Horizontal'></div>

      {cards.map((card) => (
        <StressCard text={card.text}
        key={card.id} 
        id={card.id}
        completed={card.completed}
        typing={card.typing}
        x={card.x}
        y={card.y}
        handlePosition={handlePosition}
        handleTyping={handleTyping}
        handleBlur={handleBlur}
        enableTyping = {enableTyping}
        completeCard={completeCard}
        deleteCard={deleteCard}/>
      ))}

    </div>
  )
}

export default StressCards