class PokemonService {
  baseUrl: string;

  constructor() {
    this.baseUrl = "https://pokeapi.co/api/v2";
  }

  async getPokemon(id: number) {
    return fetch(`${this.baseUrl}/pokemon/${id}`);
  }
}

export default new PokemonService();
