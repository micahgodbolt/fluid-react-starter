import React from "react";
import { useDispatch, useQueries } from "../hooks";
import { FluidContext } from "../utils";
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
  const { useGetAllNodes } = useQueries();
  const { dispatch, actions: { editNode } } = useDispatch();
  const allNodes = useGetAllNodes();

  const handleClick1 = () => dispatch(editNode({ id: "1", props: { value: Date.now().toString() } }))
  const handleClick2 = () => dispatch(editNode({ id: "2", props: { value: Date.now().toString() } }))
  return (
    <div>
      <div>Dice 1: {allNodes[0].value} <button onClick={handleClick1} >click me</button></div>
      <div>Dice 2: {allNodes[1].value} <button onClick={handleClick2} >click me</button> </div>
    </div >
  )
}
