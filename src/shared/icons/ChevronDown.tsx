import { h } from "preact";
import { HexColor } from "../types";

type Props = {
  width: number;
  height: number;
  stroke?: string | HexColor;
  fill?: string | HexColor;
};

const ChevronDown = ({ width, height, stroke, fill }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill || "black"}
      stroke={stroke || "black"}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-chevron-down"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
};

export default ChevronDown;
