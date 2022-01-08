// Style
import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
  <div className="card">
    <div className={flipped ? "flipped" : ""}>
      {/* Front == Different images */}
      <img className="front" src={ card.src } alt="card front" />
      
      {/* Back == Same images */}
      <img 
        className={`back ${disabled ? "disabled" : ""}`} 
        src="/img/cover.png" 
        alt="card back"
        onClick={ handleClick }
      />
    </div>
  </div>
  )
}

