import { React, useState, useRef, useEffect } from 'react'
import Draggable from 'react-draggable';

import '../App.css';

function StressCard({id, text, completed, typing, handleTyping, handleBlur, enableTyping, completeCard, deleteCard, x, y, handlePosition}) {

  const ref = useRef();

  // focuses on card textarea when typing set to true
  useEffect(() => {
    if (typing && ref.current) {
      ref.current.select();
      // ref.current.setSelectionRange(ref.current.value.length, ref.current.value.length);
    }
  }, [typing])

  // state handler for checkforDoubleClick
  const [waitingClick, setWaitingClick] = useState(null);
  const [lastClick, setLastClick] = useState(0);
  const [reading, setReading] = useState(true);

  // calls enableTyping on double click
  function checkforDoubleClick(e, id) {
    if(lastClick&&e.timeStamp - lastClick < 250 && waitingClick) {
      setLastClick(0);
      clearTimeout(waitingClick);
      setWaitingClick(null);
      handleDoubleClick(id);
    } else {
      setLastClick(e.timeStamp);
      setWaitingClick(setTimeout(()=>{
      setWaitingClick(null);
      }, 301))
    }
  }

  function handleDoubleClick(id) {
    setReading(false);
    enableTyping(id);
  }

  function resetCard(id) {
    setReading(true);
    handleBlur(id);
  }

  return (
      <Draggable bounds='parent'
      disabled={typing ? true : false}
      defaultPosition={{x: x, y: y}}
      onStop={(e, data) => handlePosition(e, data, id)}>
        
        <div className='StressCard' 
          style={{backgroundColor: completed ? '#5ED530' : '',
          color: completed ? 'white' : ''}}>

          <textarea ref={ref}
            value={text}
            className='Input'
            onTouchEnd={(e) => checkforDoubleClick(e, id)}
            onClick={(e) => checkforDoubleClick(e, id)}
            onChange={(e) => handleTyping(e)}
            maxLength="60"
            rows={4} cols={16}
            onBlur={() => resetCard(id)}
            readOnly={reading ? true : false}
            style={{
              cursor: reading ? 'default' : ''
            }}
            >
            </textarea>

            <div className='CardHandle'>
              <button className='DeleteButton' onTouchEnd={() => deleteCard(id)} onClick={() => deleteCard(id)}></button>
              <button className='CompleteButton' onTouchEnd={() => completeCard(id)} onClick={() => completeCard(id)}></button>
            </div>

        </div>
      </Draggable>
  )
}

export default StressCard