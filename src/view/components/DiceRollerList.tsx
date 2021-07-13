import React from "react";
import { v4 as uuid } from "uuid";
import { DiceRoller } from "./DiceRoller";
import { useGetDiceStore } from "../store";

export const DiceRollerList = () => {
  const {
    state: allDice,
    dispatch,
    actions: { editDice, createDice }
  } = useGetDiceStore();

  const handleUpdate = (id: string, value: number) => dispatch(editDice({ id, props: { value } }));

  const handleClick = () => dispatch(createDice({ id: uuid(), props: { value: 1 } }));

  const diceRollers = Object.keys(allDice).map((key: string) => (
    <DiceRoller
      key={key}
      id={key}
      value={allDice[key].value}
      updateValue={handleUpdate}
    />
  ));

  return (
    <div style={{ textAlign: "center" }}>
      <button style={{ margin: "5vh", fontSize: 20 }} onClick={handleClick} >
        Create Dice Roller
      </button>
      <div style={{ display: "flex", flexWrap: 'wrap' }}> {diceRollers} </div>
    </div>
  );
};