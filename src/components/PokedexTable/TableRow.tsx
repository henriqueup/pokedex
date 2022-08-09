import { h } from "preact";
import { generateSpriteUrl, Pokemon } from "../../models/Pokemon/Pokemon";
import style from "./style.css";
import TypesLabel from "./TypesLabel";

type Props = {
  pokemon: Pokemon;
};

const TableRow = ({ pokemon }: Props) => {
  return (
    <div class={style.row}>
      <div class={style.cell}>{pokemon.id}</div>
      <div class={style.cell}>
        <b>{pokemon.name}</b>
      </div>
      <div class={style.cell}>
        <TypesLabel types={pokemon.types} />
      </div>
      <div class={style.cell}>
        <img src={generateSpriteUrl(pokemon.id)} width={40} height={40} alt={pokemon.name} />
      </div>
    </div>
  );
};

export default TableRow;
