import { PokemonFromApi } from "../../models/Pokemon/Pokemon";

class PokemonService {
  baseUrl: string;

  constructor() {
    this.baseUrl = "https://pokeapi.co/api/v2";
  }

  async getPokemon(id: number): Promise<PokemonFromApi> {
    return fetch(`${this.baseUrl}/pokemon/${id}`).then(response => {
      if (!response.ok) {
        console.error(response);
      }

      return response.json();
    });
  }
}

export default new PokemonService();
