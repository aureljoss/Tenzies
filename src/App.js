import React from "react";
import "./style.css";
import Die from "./Die.js";
import { nanoid } from "nanoid";

export default function App() {
  const [numbers, setNumbers] = React.useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        id: nanoid(),
        isHeld: false,
      });
    }
    console.log(newDice);
    return newDice;
  }

  function holdDice(id) {
    setNumbers((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = numbers.map((die) => (
    <Die
      value={die.value}
      holdDice={() => holdDice(die.id)}
      key={die.id}
      isHeld={die.isHeld}
    />
  ));

  function rollDice(id){
    setNumbers((oldDice)=>
    oldDice.map((die)=>{
      return die.isHeld ? die : {...die, value: Math.floor(Math.random() * 6) + 1, id: nanoid() }
    })
    )
  }

  return (
    <main>
      <div id="rules"> 
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div id="die-container">{diceElements}</div>
      <button type="button" id="roll-Button" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
