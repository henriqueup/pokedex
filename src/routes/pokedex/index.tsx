import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import PokedexTable from "../../components/PokedexTable";
import Select from "../../components/Select";
import { Pokemon } from "../../models/Pokemon/Pokemon";
import { types } from "../../models/Pokemon/Type";
import style from "./style.css";

type PokedexFilters = {
  type: string | undefined;
};

const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>(Pokemon);
  const [filters, setFilters] = useState<PokedexFilters>({ type: undefined });

  const typeOptions = types.map(type => ({ value: type.id.toString(), label: type.name }));

  useEffect(() => {
    if (filters.type) {
      setPokemon(
        Pokemon.filter(item => item.types.find(type => filters.type === type.id.toString()))
      );
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
          handleChange={(value: string) => setFilters({ ...filters, type: value })}
        />
      </div>
      <PokedexTable pokemon={pokemon} />
    </div>
  );
};

export default Pokedex;
