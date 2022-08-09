import { HexColor } from "src/shared/types";

export type Type = {
  id: number;
  name: string;
  color: HexColor;
};

export const types: Type[] = [
  {
    id: 1,
    name: "Grass",
    color: "#036b15"
  },
  {
    id: 2,
    name: "Fire",
    color: "#ff0000"
  },
  {
    id: 3,
    name: "Water",
    color: "#0000ff"
  },
  {
    id: 4,
    name: "Electric",
    color: "#ffff00"
  },
  {
    id: 5,
    name: "Bug",
    color: "#8cba02"
  },
  {
    id: 6,
    name: "Poison",
    color: "#39ed4b"
  }
];
