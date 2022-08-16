import { h } from "preact";
import style from "./style.css";

type Props = {
  columns: string[];
};

const TableHeader = ({ columns }: Props) => {
  return (
    <div class={style.headerRow}>
      {columns.map((name, i) => (
        <div class={style.headerCell} key={i}>
          {name}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;
