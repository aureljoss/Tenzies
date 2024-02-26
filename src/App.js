import React from "react";
import "./style.css";
import Die from "./Die.js";

export default function App() {
  const [numbers, setNumbers] = React.useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(Math.floor(Math.random() * 6) + 1);
    }
    return newDice;
  }

  const diceElements = numbers.map((randomNumber) => (
    <Die value={randomNumber} />
  ));

  function rollDice() {
    setNumbers(allNewDice());
  }

  return (
    <main>
      <div id="die-container">{diceElements}</div>
      <button type="button" id="roll-Button" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
