import React from "react";
import { useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useDispatch, useQueries } from "../../utils";
import { FluidContext } from "../../utils";
import { DiceRoller } from "../components/DiceRoller";

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
  const {
    dispatch,
    actions: { createNode, editNode },
  } = useDispatch();
  const allNodeIds = useGetAllNodeIds({});
  const handleUpdate = (id:string, value: number) => dispatch(editNode({ id, props: { value } }));
  const diceRollers = allNodeIds.map((id: string) => (
    <DiceRoller
      id={id}
      key={id}
      getNode={useGetNode}
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
