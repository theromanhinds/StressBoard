import React, { useState } from 'react'
import Draggable from 'react-draggable';
import StressCards from './StressCards';

import '../App.css';

function StressCard({id, text, selected, updateSelected}) {

  // const [isActive, setIsActive] = useState(false);

  function setSelected(id){
    // console.log(`Card ${id} selected!`);
    // setIsActive(current => !current);
    updateSelected(id);
  }

  return (
      <Draggable bounds='.StressCardsRange' positionOffset={{ x: '-50%', y: '-50%' }}>
        <div className='StressCard' onClick={() => setSelected(id)}
        style={{
          backgroundColor: selected ? 'salmon' : '',
          color: selected ? 'white' : '',
          zIndex: selected ? '10' : '',
        }}>
          {text}
        </div>
      </Draggable>
  )
}

export default StressCard