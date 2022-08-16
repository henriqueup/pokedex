import { h, VNode } from "preact";
import style from "./style.css";
import TableHeader from "./TableHeader";

interface IProps<T> {
  data: T[];
  mapRow: (item: T, index: number) => VNode;
  columns: string[];
}

const Table = <T extends object>({ data, mapRow, columns }: IProps<T>) => {
  return (
    <div class={style.table}>
      <TableHeader columns={columns} />
      {data.map((item, i) => mapRow(item, i))}
    </div>
  );
};

export default Table;
