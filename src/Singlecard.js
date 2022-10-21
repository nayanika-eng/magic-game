import React from 'react';
import "./Singlecard.css"

function Singlecard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }
    return (
        <div className='card' >
            <div className={flipped ? "flipped" : ""}>
                <img className='front' src={card.src} alt=""></img>
                <img className='back' src='/img/cover.png' onClick={handleClick} alt='' />
            </div>
        </div>
    )
}

export default Singlecard