import {useEffect, useState} from 'react'
import './App.css';
import Cards from './components/Cards'

const cardImages = [
  {"src" : "/img/helmet-1.png", matched: false},
  {"src" : "/img/potion-1.png", matched: false},
  {"src" : "/img/shield-1.png", matched: false},
  {"src" : "/img/sword-1.png", matched: false},
  {"src" : "/img/scroll-1.png", matched: false},
  {"src" : "/img/ring-1.png", matched: false}
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setChoiceOne(null);
    setChoiceTwo(null);  
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne === null ? setChoiceOne(card) : setChoiceTwo(card)
  }

  //check if the choice is correct
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
          if (card.src === choiceOne.src) {
            return { ...card, matched: true }
          }
          else {
            return card;
          }
        })
      })
      reset();
      } else {
        setTimeout(() => reset(),(1000));
      }
      
     
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, [])


  //reset function
  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
    setDisabled(false);
  }

  

  return (
    <div className="App">
      <h1>Memory game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (         
            <Cards key={card.id} card={card} handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            />        
          ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
    );
}

        

export default App;
