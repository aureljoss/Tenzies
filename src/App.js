import React, { useEffect } from "react";
import "./style.css";
import Die from "./Components/Die.js";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Timer from "./Components/Timer.js";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  useEffect(() => {
    // let arr=[dice[0].isHeld, dice[1].isHeld]
    const allEqual = dice.every((die) => die.value === dice[0].value);
    const allHeld = dice.every((die) => die.isHeld);
    if (allEqual && allHeld) {
      setTenzies(true);
      console.log("You WON!");
    }
  }, dice);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  useEffect(() => {
    tenzies && setIsRunning(false);
  });

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

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
    if (!tenzies) {
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
      setCount((prevCount) => prevCount + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setCount(1);
    }
    if (count === 0) {
      setIsRunning(true);
    }
    if (tenzies) {
      setTime(0);
      setCount(0);
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <div id="rules">
        <h1>Tenzies</h1>
        <p>
          {tenzies
            ? "You won!!!"
            : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
        </p>
      </div>
      <div id="die-container">{diceElements}</div>
      <button type="button" id="roll-Button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div id="timer-Count">
        <p className="button-Count-Time">Rolls: {count}</p>
        <p className="button-Count-Time">
          Timer: {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </p>
      </div>
    </main>
  );
}
