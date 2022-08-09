import { h } from "preact";
import { Pokemon } from "../../models/Pokemon/Pokemon";
import style from "./style.css";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

type Props = {
  pokemon: Pokemon[];
};

const PokedexTable = ({ pokemon }: Props) => {
  return (
    <div class={style.table}>
      <TableHeader columns={["Id", "Name", "Types", "Picture"]} />
      {pokemon.map(item => (
        <TableRow pokemon={item} key={item.id} />
      ))}
    </div>
  );
};

export default PokedexTable;
