import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useQueries } from "../hooks";
import { FluidContext } from "../utils";
import { DiceRoller } from "./DiceRoller";

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
    actions: { editNode },
  } = useDispatch();
  const allNodeIds = useGetAllNodeIds();
  const diceRollers = allNodeIds.map((id: string) => (
    <DiceRoller
      id={id}
      getNode={useGetNode}
      updateValue={(value: number) =>
        dispatch(editNode({ id, props: { value } }))
      }
    />
  ));
  return <div>{diceRollers}</div>;
};
