import React from 'react'
import Draggable from 'react-draggable';

import '../App.css';

function StressCard(props) {
  return (
    <div>
      <Draggable>
        <div className='StressCard'>
          {props.text}
        </div>
      </Draggable>
      </div>
  )
}

export default StressCard