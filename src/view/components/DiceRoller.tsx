import React from 'react';
interface IDiceRollerProps {
  id: string;
  value: number;
  updateValue: (id: string) => void;
}

export const DiceRoller = (props: IDiceRollerProps) => {
  const { id, updateValue } = props;

  const diceCharacter = String.fromCodePoint(0x267f + props.value);
  const rollDice = () => updateValue(id);

  return (
    <div>
      <div
        style={{
          fontSize: 200,
          lineHeight: 1,
          color: `hsl(${props.value * 60}, 70%, 50%)`,
        }}
      >
        {diceCharacter}
      </div>
      <button style={{ fontSize: 50 }} onClick={rollDice}>
        Roll
      </button>
      <div style={{ fontSize: 12 }}>{id.split('-')[0]}</div>
    </div>
  );
};
