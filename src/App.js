import React from "react";
import "./style.css";
import Die from "./Die.js";
import { nanoid } from "nanoid";

export default function App() {
  /**
   * Challenge: Update the array of numbers in state to be
   * an array of objects instead. Each object should look like:
   * { value: <random number>, isHeld: false }
   *
   * Making this change will break parts of our code, so make
   * sure to update things so we're back to a working state
   */
  const [numbers, setNumbers] = React.useState(allNewDice());
  const [held, setHeld] = React.useState(false);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    console.log(newDice);
    return newDice;
  }

  function hold() {
    setHeld((prevHeld) => !prevHeld);
  }

  const diceElements = numbers.map((randomNumber) => (
    <Die value={randomNumber.value} handleClick={hold} key={randomNumber.id} />
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
