import React from 'react'
import StressCard from './StressCard'

import '../App.css'

function StressCards(props) {
  return (
    <div className='StressCardsRange'>
        {props.cards.map((card) => (
        <StressCard text={card.text}/>
        ))}
    </div>
  )
}

export default StressCards