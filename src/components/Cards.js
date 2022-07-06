import "./Cards.css";

const Cards = ({card, handleChoice, flipped, disabled}) => {

    const handleClick = () => {
       
        if(!disabled) {
            handleChoice(card);
        }
    }

    return ( 
        <div className="card">
        <div className={flipped ? "flipped" : ""}>
              <img className="front" src={card.src} alt="card front" />
              <img className="back" onClick={handleClick} src="/img/cover.png" alt="card back" />
            </div>
        </div>
    
     );
}
 
export default Cards;