import React from "react";
import { useDispatch, useQueries } from "../hooks";
import { FluidContext } from "../utils";
import { useParams } from "react-router-dom";

export const FluidPage = () => {
  let { id } = useParams<{id:string}>();
  return (
    <FluidContext id={id}>
      <PageContent  />
    </FluidContext>
  );
};

const PageContent = () => {
  const { useGetAllNodes } = useQueries();
  const { dispatch, actions } = useDispatch();
  const allNodes = useGetAllNodes();

  return (
    <div>  <h1>Welcome</h1></div>
  )
}
