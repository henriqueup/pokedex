import { Pokemon } from "../../models/Pokemon/Pokemon";
import PokemonService from "../../shared/services/PokemonService";
import { batchRequests } from "../../shared/utils/requestUtils";

class PokedexManager {
  maxId: number;

  constructor() {
    this.maxId = 100;
  }

  async getPokemon(): Promise<Pokemon[]> {
    const params = Array.from({ length: this.maxId }, (_, i) => i + 1);
    const callbacks = params.map(p => () => PokemonService.getPokemon(p));

    const responses = await batchRequests(callbacks, params);

    return Pokemon.mapNFromApi(responses);
  }
}

export default new PokedexManager();
