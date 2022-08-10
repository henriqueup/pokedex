import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import PokedexTable from "../../components/PokedexTable";
import Select from "../../components/Select";
import { Pokemon } from "../../models/Pokemon/Pokemon";
import { types } from "../../models/Pokemon/Type";
import manager from "./manager";
import style from "./style.css";

type PokedexFilters = {
  type: number | undefined;
};

const Pokedex = () => {
  //TODO:
  //start using PokeAPI: https://pokeapi.co/
  //https://pokeapi.co/api/v2/pokemon/weedle
  const [pokemon, setPokemon] = useState<Pokemon[]>(Pokemon);
  const [filters, setFilters] = useState<PokedexFilters>({ type: undefined });

  const typeOptions = types.map(type => ({ key: type.id, value: type.name }));

  useEffect(() => {
    manager.getPokemon();
  }, []);

  useEffect(() => {
    if (filters.type) {
      setPokemon(Pokemon.filter(item => item.types.find(type => filters.type === type.id)));
    } else {
      setPokemon(Pokemon);
    }
  }, [filters]);

  return (
    <div class={style.root}>
      <div class={style.filtersContainer}>
        <div />
        <Select
          label="Types"
          options={typeOptions}
          handleChange={key => setFilters({ ...filters, type: key as number })}
        />
      </div>
      <PokedexTable pokemon={pokemon} />
    </div>
  );
};

export default Pokedex;
