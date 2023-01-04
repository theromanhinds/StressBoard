import React from 'react'
import StressCard from './StressCard'
import Draggable from 'react-draggable';


import '../App.css'

function StressCards({cards, updateSelected, handleChange, 
  handleFocus, handleBlur, deselect}) {

  return (
    <div className='StressCardsRange' onClick={(event) => deselect(event)}>
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