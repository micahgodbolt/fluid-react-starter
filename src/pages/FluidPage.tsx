import React from "react";
import { useDispatch, useQueries } from "../hooks";
import { FluidContext } from "../utils";
import { Node } from "../model";
import { useParams } from "react-router-dom";

export const FluidPage = () => {
  let { id } = useParams<{ id: string }>();
  return (
    <FluidContext id={id}>
      <PageContent />
    </FluidContext>
  );
};

const PageContent = () => {
  const { useGetAllNodeIds, useGetNode } = useQueries();
  const { dispatch, actions: { editNode } } = useDispatch();
  const allNodeIds = useGetAllNodeIds();
  const diceRollers: JSX.Element[] = [];
  allNodeIds.forEach((id: string) => {
    const diceRoller =
      <DiceRoller 
        id={id}
        getNode={useGetNode}
        updateValue={(value: number) => dispatch(editNode({ id, props: { value }}))}
      />;
    diceRollers.push(diceRoller);
  });
  return (
    <div>{diceRollers}</div>
  )
}

interface IDiceRollerProps {
  id: string;
  getNode: (id: string) => Node;
  updateValue: (value: number) => void;
}

const DiceRoller = (props: IDiceRollerProps) => {
  const { id, getNode, updateValue } = props;
  const diceNode = getNode(id);

  const diceCharacter = String.fromCodePoint(0x267F + diceNode.value);
  const rollDice = () => updateValue(Math.floor(Math.random() * 6) + 1);

  return (
      <>
          <div style={{ fontSize: 200, color: `hsl(${diceNode.value * 60}, 70%, 50%)` }}>
              {diceCharacter}
          </div>
          <button style={{ fontSize: 50 }} onClick={rollDice}>
              Roll
          </button>
      </>
  );
}

