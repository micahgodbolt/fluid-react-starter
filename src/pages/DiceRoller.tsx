import { Node } from "../model";

interface IDiceRollerProps {
  id: string;
  getNode: (id: string) => Node;
  updateValue: (id: string, value: number) => void;
}

export const DiceRoller = (props: IDiceRollerProps) => {
  const { id, getNode, updateValue } = props;
  const diceNode = getNode(id);

  const diceCharacter = String.fromCodePoint(0x267f + diceNode.value);
  const rollDice = () => updateValue(id, Math.floor(Math.random() * 6) + 1);

  return (
    <div>
      <div
        style={{
          fontSize: 200,
          color: `hsl(${diceNode.value * 60}, 70%, 50%)`,
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
