import React, { useState } from 'react'
import Draggable from 'react-draggable';
import StressCards from './StressCards';

import '../App.css';

function StressCard({id,
   text, selected, typing, updateSelected, 
   handleChange, handleFocus, handleBlur}) {

  function setSelected(id){
    updateSelected(id);
  }
  return (
      <Draggable 
      /*bounds='.StressCardsRange'*/
      positionOffset={{ x: '-50%', y: '-50%' }}
      disabled = {typing ? true : false}
      >
        <div className='StressCard' onClick={() => setSelected(id)}
        style={{
          backgroundColor: selected ? 'salmon' : '',
          color: selected ? 'white' : '',
          zIndex: selected ? '10' : '',
        }}>
          <textarea 
          className='Input' 
          onChange={(e) => handleChange(e)}
          maxlength="60"
          rows={3} cols={20}
          onMouseEnter={() => handleFocus(id)}
          onMouseLeave={() => handleBlur(id)}>
            {text}
            </textarea>
        </div>
      </Draggable>
  )
}

export default StressCard