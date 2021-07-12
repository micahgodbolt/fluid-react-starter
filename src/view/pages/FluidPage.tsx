import React from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useDispatch, FluidContext } from "../../utils";
import { DiceRoller } from "../components/DiceRoller";
import { useGetDiceStore } from "../queries";

export const FluidPage = () => {
  let { id } = useParams<{ id: string }>();
  return (
    <FluidContext id={id}>
      <PageContent />
    </FluidContext>
  );
};

const PageContent = () => {
  const {
    dispatch,
    actions: { createNode, editNode },
  } = useDispatch();
  const allDice = useGetDiceStore().state;
  const handleUpdate = (id: string, value: number) => dispatch(editNode({ id, props: { value } }));
  console.log(allDice)
  const diceRollers = Object.keys(allDice).map((key: string) => (
    <DiceRoller
      key={key}
      id={key}
      value={allDice[key].value}
      updateValue={handleUpdate}      
    />
  ));

  const createNewDiceRoller = () =>
    dispatch(createNode({ id: uuid(), props: { value: 1 } }));

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{display: "flex", flexWrap: 'wrap'}}>{diceRollers}</div>
      <button
        style={{ margin: "5vh", fontSize: 20 }}
        onClick={createNewDiceRoller}
      >
        {"Create Dice Roller"}
      </button>
    </div>
  );
};
