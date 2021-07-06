import React from "react";
import { useDispatch, useQueries } from "../hooks";
import { FluidContainer } from "../components";
import { useParams } from "react-router-dom";

export const FluidPage = () => {
  let { id } = useParams<{id:string}>();
  return (
    <FluidContainer id={id}>
      <PageContent id={id} />
    </FluidContainer>
  );
};

const PageContent = (props:{id: string}) => {
  const { useGetAllNodes } = useQueries();
  const { dispatch, actions } = useDispatch();
  const allNodes = useGetAllNodes();

  return (
    <div>  <h1>Welcome: {props.id}</h1></div>
  )
}
