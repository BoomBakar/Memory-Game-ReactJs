import {useEffect, useState} from 'react'
import './App.css';
import Cards from './components/Cards'

const cardImages = [
  {"src" : "/img/helmet-1.png"},
  {"src" : "/img/potion-1.png"},
  {"src" : "/img/shield-1.png"},
  {"src" : "/img/sword-1.png"},
  {"src" : "/img/scroll-1.png"},
  {"src" : "/img/ring-1.png"}
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  //shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }

  //handle a choice
  const handleChoice = (card) => {
    choiceOne === null ? setChoiceOne(card) : setChoiceTwo(card)
    console.log(choiceOne, choiceTwo);
  }

  //check if the choice is correct
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("You found a match!");
      } else {
        console.log("Sorry, try again!");
      }
      reset();
      console.log(turns);
    }
  }, [choiceOne, choiceTwo]);

  //reset function
  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
  }

  

  return (
    <div className="App">
      <h1>Memory game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (         
            <Cards key={card.id} card={card} handleChoice={handleChoice} />        
          ))}
      </div>
    </div>
    );
}

        

export default App;
