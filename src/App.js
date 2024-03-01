import React, { useEffect } from "react";
import "./style.css";
import Die from "./Die.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  useEffect(() => {
    // let arr=[dice[0].isHeld, dice[1].isHeld]
    const allEqual = dice.every((die) => die.value === dice[0].value);
    const allHeld = dice.every((die) => die.isHeld);
    if (allEqual && allHeld) {
      setTenzies(true);
      console.log("You WON!");
    }
  }, dice);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        id: nanoid(),
        isHeld: false,
      });
    }
    return newDice;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      holdDice={() => holdDice(die.id)}
      key={die.id}
      isHeld={die.isHeld}
    />
  ));

  function rollDice(id) {
    if (tenzies === false) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld
            ? die
            : {
                ...die,
                value: Math.floor(Math.random() * 6) + 1,
                id: nanoid(),
              };
        })
      );
    }
    else {allNewDice()}
  }

  return (
    <main>
      <div id="rules">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
      </div>
      <div id="die-container">{diceElements}</div>
      <button type="button" id="roll-Button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      {tenzies ? <Confetti /> : ""}
    </main>
  );
}
