import { h } from "preact";
import { HexColor } from "../types";
import BaseSvgIcon from "./BaseSvgIcon";

type Props = {
  width: number;
  height: number;
  stroke?: string | HexColor;
  fill?: string | HexColor;
};

const ChevronDown = ({ width, height, stroke, fill }: Props) => {
  return (
    <BaseSvgIcon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </BaseSvgIcon>
  );
};

export default ChevronDown;
