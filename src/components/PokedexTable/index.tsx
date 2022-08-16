import { h } from "preact";
import { Pokemon } from "../../models/Pokemon/Pokemon";
import Table from "../table";
import TableRow from "./TableRow";

type Props = {
  pokemon: Pokemon[];
};

const PokedexTable = ({ pokemon }: Props) => {
  return (
    <Table
      data={pokemon}
      mapRow={item => <TableRow pokemon={item} key={item.id} />}
      columns={["Id", "Name", "Types", "Picture"]}
    />
  );
};

export default PokedexTable;
