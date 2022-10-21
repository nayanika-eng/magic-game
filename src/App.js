import { useEffect, useState } from 'react'
import './App.css'
import Singlecard from './Singlecard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceone, setChoiceOne] = useState(null);
  const [choicetwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false)

  //shuffling cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards);
    setTurns(0);
  }
  //handle a choice
  const handleChoice = (card) => {
    choiceone ? setChoiceTwo(card) : setChoiceOne(card)
  }
  useEffect(() => {
    if (choiceone && choicetwo) {
      setDisabled(true)
      if (choiceone.src === choicetwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceone.src)
              return { ...card, matched: true }
            else {
              return card
            }
          })
        })
        console.log('those cards are matching')
        resetTurn()
      } else {
        console.log("those cards are not matching")
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceone, choicetwo])
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {
          cards.map(card => (
            <Singlecard key={card.id} card={card} handleChoice={handleChoice}
              flipped={card === choiceone || card === choicetwo | card.matched}
              disabled={disabled} />
          ))
        }

      </div>
    </div>

  );
}

export default App