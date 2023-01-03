import React from 'react'
import StressCard from './StressCard'
import Draggable from 'react-draggable';


import '../App.css'

function StressCards({cards, 
  addCard, updateSelected, handleChange, 
  handleFocus, handleBlur}) {

  return (
    <div className='StressCardsRange' onClick={(event) => addCard(event)}>
        {cards.map((card) => (
        <StressCard 
          text={card.text} 
          selected={card.selected}
          id={card.id}
          typing={card.typing}
          updateSelected={updateSelected}
          handleChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}/>
        ))}
    </div>
  )
}

export default StressCards