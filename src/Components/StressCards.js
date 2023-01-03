import React from 'react'
import StressCard from './StressCard'
import Draggable from 'react-draggable';


import '../App.css'

function StressCards({cards, addCard, updateSelected}) {

  return (
    <div className='StressCardsRange' /*onClick={() => addCard()}*/>
        {cards.map((card) => (
        <StressCard 
          text={card.text} 
          selected={card.selected}
          id={card.id}
          updateSelected={updateSelected}/>
        ))}
    </div>
  )
}

export default StressCards