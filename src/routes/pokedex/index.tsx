import { h } from "preact";
import { useEffect, useMemo, useState } from "preact/hooks";
import PokedexTable from "../../components/PokedexTable";
import Select from "../../components/Select";
import { Pokemon } from "../../models/Pokemon/Pokemon";
import { Type } from "../../models/Pokemon/Type";
import manager from "./manager";
import style from "./style.css";

type PokedexFilters = {
  type: string | undefined;
};

const Pokedex = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filters, setFilters] = useState<PokedexFilters>({ type: undefined });

  const filteredPokemon = useMemo(() => {
    if (filters.type) {
      return pokemon.filter(item => item.types.find(type => filters.type === type.id));
    }

    return pokemon;
  }, [filters, pokemon]);

  useEffect(() => {
    const getPokemon = async () => {
      setPokemon(await manager.getPokemon());
    };

    getPokemon();
  }, []);

  const typeOptions = useMemo(() => {
    return Type.types.map(type => ({ key: type.id, value: type.name }));
  }, []);

  return (
    <div class={style.root}>
      <div class={style.filtersContainer}>
        <div />
        <Select
          label="Types"
          options={typeOptions}
          handleChange={key => setFilters({ ...filters, type: key as string })}
        />
      </div>
      <PokedexTable pokemon={filteredPokemon} />
    </div>
  );
};

export default Pokedex;
