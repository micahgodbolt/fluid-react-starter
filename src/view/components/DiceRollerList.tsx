import React from "react";
import { v4 as uuid } from "uuid";
import { DiceRoller } from "./DiceRoller";
import { useGetDiceStore } from "../store";

export const DiceRollerList = () => {
  const {
    dispatch,
    actions: { editDice, createDice },
    queries: { getAllDice, getByValue }
  } = useGetDiceStore();

  const randomizeDice = (id: string) => dispatch(editDice(
    {
      id,
      props: { value: Math.floor(Math.random() * 6) + 1 }
    }
  ));

  const handleClick = () => dispatch(createDice({ id: uuid(), props: { value: 1 } }));
  const handleRollAll = () => {
    getAllDice().forEach((dice: any) => {
      randomizeDice(dice.key)
    });
  }

  console.log(getAllDice())

  const diceRollers = getAllDice().map((dice: any) => (
    <DiceRoller
      key={dice.key}
      id={dice.key}
      value={dice.value}
      updateValue={randomizeDice}
    />
  ));

  const sixes = getByValue(6).map((dice: any) => (
    <DiceRoller
      key={dice.key}
      id={dice.key}
      value={dice.value}
      updateValue={randomizeDice}
    />
  ));


  return (
    <div style={{ textAlign: "center" }}>
      <button style={{ margin: "5vh", fontSize: 20 }} onClick={handleClick} >
        Create Dice Roller
      </button>

      <button style={{ margin: "5vh", fontSize: 20 }} onClick={handleRollAll} >
        Roll All
      </button>
      <div style={{ display: "flex", flexWrap: 'wrap', marginBottom: '5em' }}> {diceRollers} </div>
      <hr/>
      <h1>Sixes</h1>
      <div style={{ display: "flex", flexWrap: 'wrap' }}>  {sixes} </div>


    </div>
  );
};