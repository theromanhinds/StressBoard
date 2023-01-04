import React, { useRef, useEffect } from 'react'
import Draggable from 'react-draggable';

import '../App.css';

function StressCard({id, text, completed, typing, handleChange, handleBlur, enableTyping, completeCard, deleteCard}) {

    const ref = useRef();

    useEffect(() => {
      if (typing && ref.current) ref.current.focus();
    }, [typing])

  return (
      <Draggable 
      positionOffset={{ x: '-50%', y: '-50%' }}
      disabled = {typing ? true : false}
      >
        <div className='StressCard' 
          onDoubleClick={() => enableTyping(id)}
          style={{backgroundColor: completed ? 'lightGreen' : '',
          color: completed ? 'white' : ''}}>

          <textarea ref={ref}
            value={text}
            className='Input' 
            onChange={(e) => handleChange(e)}
            maxlength="60"
            rows={4} cols={16}
            onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            onBlur={() => handleBlur(id)}
            disabled={typing ? false : true}></textarea>

            <button className='DeleteButton' onClick={() => deleteCard(id)}>❌</button>
            <button className='CompleteButton' onClick={() => completeCard(id)}>✅</button>

        </div>
      </Draggable>
  )
}

export default StressCard