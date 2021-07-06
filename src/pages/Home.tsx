import React from "react";
import { useHistory } from "react-router-dom";
import { createFluidContainer } from "../model";

export const Home = () => {
  const history = useHistory();
  const handleClick = async () => {
    const containerId = await createFluidContainer();
    history.push(`/fluid/${containerId}`)
  }

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handleClick}>Create</button>
    </div>
  )
};

