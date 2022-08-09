import { Type, types } from "./Type";

export type Pokemon = {
  id: number;
  name: string;
  types: Type[];
};

const spriteBaseUrl = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/{id}.png";

const zeroFill = (id: number) => {
  const baseFill = "000";
  const idString = id.toString();

  return baseFill.substring(idString.length) + idString;
};

export const generateSpriteUrl = (id: number): string => {
  return spriteBaseUrl.replace("{id}", zeroFill(id));
};

export const Pokemon: Pokemon[] = [
  {
    id: 1,
    name: "Bulbasaur",
    types: [types[0]]
  },
  {
    id: 4,
    name: "Charmander",
    types: [types[1]]
  },
  {
    id: 7,
    name: "Squirtle",
    types: [types[2]]
  },
  {
    id: 25,
    name: "Pikachu",
    types: [types[3]]
  },
  {
    id: 13,
    name: "Weedle",
    types: [types[4], types[5]]
  }
];
