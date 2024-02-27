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
        isHeld: true,
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
      isHeld={die.isheld}
    />
  ));

  function rollDice() {
    setNumbers(allNewDice());
  }

  return (
    <main>
      <div id="die-container">{diceElements}</div>
      <button type="button" id="roll-Button">
        Roll
      </button>
    </main>
  );
}
