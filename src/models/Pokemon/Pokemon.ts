import { capitalize } from "../../shared/utils/stringUtils";
import { Type, TypesFromApi } from "./Type";

export type PokemonFromApi = {
  id: number;
  name: string;
  types: TypesFromApi[];
};

export class Pokemon {
  id: number;
  name: string;
  types: Type[];

  static spriteBaseUrl = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/{id}.png";

  private constructor(id: number, name: string, types: Type[]) {
    this.id = id;
    this.name = name;
    this.types = types;
  }

  static mapFromApi(apiObject: PokemonFromApi): Pokemon {
    const types = apiObject.types.map(type => new Type(type.type.name));

    return new Pokemon(apiObject.id, capitalize(apiObject.name), types);
  }

  static mapNFromApi(apiObjects: PokemonFromApi[]): Pokemon[] {
    return apiObjects.map(obj => Pokemon.mapFromApi(obj));
  }

  private zeroFill() {
    const baseFill = "000";
    const idString = this.id.toString();

    return baseFill.substring(idString.length) + idString;
  }

  generateSpriteUrl(): string {
    return Pokemon.spriteBaseUrl.replace("{id}", this.zeroFill());
  }
}
