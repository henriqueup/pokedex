import { Fragment, h } from "preact";
import { Type } from "src/models/Pokemon/Type";

type Props = {
  types: Type[];
};

const TypesLabel = ({ types }: Props) => {
  return (
    <span>
      {types.map((type, i) => (
        <Fragment key={type.id}>
          {i > 0 && " - "}
          <span style={{ color: type.color }}>{type.name}</span>
        </Fragment>
      ))}
    </span>
  );
};

export default TypesLabel;
