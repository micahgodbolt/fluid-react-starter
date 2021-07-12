import React from "react";
interface IDiceRollerProps {
  id: string;
  value: number;
  updateValue: (id: string, value: number) => void;
}

export const DiceRoller = (props: IDiceRollerProps) => {
  const { id, updateValue } = props;

  const diceCharacter = String.fromCodePoint(0x267f + props.value);
  const rollDice = () => updateValue(id, Math.floor(Math.random() * 6) + 1);

  return (
    <div>
      <div
        style={{
          fontSize: 200,
          color: `hsl(${props.value * 60}, 70%, 50%)`,
        }}
      >
        {diceCharacter}
      </div>
      <button style={{ fontSize: 50 }} onClick={rollDice}>
        Roll
      </button>
    </div>
  );
};
