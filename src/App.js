// Packages
import { useEffect, useState } from 'react';

// Styles
import './App.css'

// Components
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "img/helmet-1.png", matched: false },
  { "src": "img/potion-1.png", matched: false },
  { "src": "img/ring-1.png", matched: false },
  { "src": "img/scroll-1.png", matched: false },
  { "src": "img/shield-1.png", matched: false },
  { "src": "img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  // Choices
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    // spreads the values of cardImages, length = 12
    const shuffledCards = [...cardImages, ...cardImages] 
      // shuffles the card in random order -read sort(return{negative,positive})
      .sort(() => Math.random() - 0.5) 
      // places the items in the objects
      .map(card => ({...card, id: Math.random()})) 

    // Double check: whether it has a value before
    setChoiceOne(null)
    setChoiceTwo(null)

    setCards(shuffledCards)
  }

  // Handle a choice
  const handleChoice = (card) => { // outputs the card object that you choses
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // Compare two selected cards
  useEffect(() => {
    // If both the variable has value
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      // If both the value is equal
      if (choiceOne.src === choiceTwo.src) {
        // set the cards value, and spread it to grab each value
        setCards(prevCard => {
          return prevCard.map(card => { // map to all the value of card 
            if (card.src === choiceOne.src) { // check if the choiceOne is equal to the card
              return {...card, matched: true} // spread the value of each of card, change matched to true 
            }
            else { // otherwise, just return the value of the card
              return card 
            }
          })
        })
        resetTurns()
      } else {
        setTimeout(() => resetTurns(), 750)
      }
    }

  }, [choiceOne, choiceTwo])

  // Reset choiceOne and choiceTwo & increments the value of turns
  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn + 1)
    setDisabled(false)
  }

  // start the game automatically
  useEffect(() => shuffleCards(), [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <hr />

      {/* Card */}
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={ card.id } 
            card={ card }
            handleChoice={ handleChoice }
            flipped={ card === choiceOne || card === choiceTwo || card.matched }
            disabled={ disabled }
          />
        ))}
        {cards.length ? <h3>Turns: { turns }</h3> : null}
      </div>
    </div>
  );
}

export default App