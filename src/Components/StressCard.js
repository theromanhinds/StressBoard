import { React, useState, useRef, useEffect } from 'react'
import Draggable from 'react-draggable';

import '../App.css';

function StressCard({id, text, completed, typing, handleChange, handleBlur, enableTyping, completeCard, deleteCard}) {

  const ref = useRef();

  // focuses on card textarea when typing set to true
  useEffect(() => {
    if (typing && ref.current) ref.current.focus();
  }, [typing])

  // state handler for checkforDoubleClick
  const [waitingClick, setWaitingClick] = useState(null);
  const [lastClick, setLastClick] = useState(0);

  // calls enableTyping on double click
  function checkforDoubleClick(e, id) {
    if(lastClick&&e.timeStamp - lastClick < 250 && waitingClick) {
      setLastClick(0);
      clearTimeout(waitingClick);
      setWaitingClick(null);
      enableTyping(id);
    } else {
      setLastClick(e.timeStamp);
      setWaitingClick(setTimeout(()=>{
      setWaitingClick(null);
      }, 301))
    }
  }

  return (
      <Draggable bounds='parent'
      disabled = {typing ? true : false}>
        
        <div className='StressCard' 
          onClick={(e) => checkforDoubleClick(e, id)}
          style={{backgroundColor: completed ? '#5ED530' : '',
          color: completed ? 'white' : ''}}>

          <textarea ref={ref}
            value={text}
            className='Input' 
            onChange={(e) => handleChange(e)}
            maxLength="60"
            rows={4} cols={16}
            onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            onBlur={() => handleBlur(id)}
            disabled={typing ? false : true}></textarea>

            <button className='DeleteButton' onClick={() => deleteCard(id)}></button>
            <button className='CompleteButton' onClick={() => completeCard(id)}></button>

        </div>
      </Draggable>
  )
}

export default StressCard