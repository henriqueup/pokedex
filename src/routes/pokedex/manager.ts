import { Pokemon } from "../../models/Pokemon/Pokemon";
import PokemonService from "../../shared/services/PokemonService";
import { batchRequests } from "../../shared/utils/requestUtils";

class PokedexManager {
  maxId: number;

  constructor() {
    this.maxId = 50;
  }

  async getPokemon(): Promise<Pokemon[]> {
    const params = Array.from({ length: this.maxId }, (_, i) => i + 1);
    const callbacks = params.map(p => async () => {
      const r = await PokemonService.getPokemon(p);
      return r.json();
    });

    const responses = await batchRequests(callbacks, params);
    console.log(responses);

    return [];
  }
}

export default new PokedexManager();
