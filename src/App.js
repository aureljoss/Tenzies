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

  return (
    <main>
      <div id="die-container">{diceElements}</div>
    </main>
  );
}
