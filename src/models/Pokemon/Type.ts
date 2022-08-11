import { HexColor } from "src/shared/types";
import { capitalize } from "../../shared/utils/stringUtils";

export type TypesFromApi = {
  type: { name: string };
};

const typeColors: { id: string; color: HexColor }[] = [
  {
    id: "grass",
    color: "#036b15"
  },
  {
    id: "fire",
    color: "#ff0000"
  },
  {
    id: "water",
    color: "#0000ff"
  },
  {
    id: "electric",
    color: "#ffff00"
  },
  {
    id: "bug",
    color: "#8cba02"
  },
  {
    id: "poison",
    color: "#39ed4b"
  }
];

export class Type {
  id: string;
  name: string;
  color: HexColor | undefined;

  constructor(id: string) {
    this.id = id;
    this.name = capitalize(id);
    this.color = typeColors.find(item => item.id === id)?.color;
  }

  static types: Type[] = typeColors.map(item => new Type(item.id));
}
