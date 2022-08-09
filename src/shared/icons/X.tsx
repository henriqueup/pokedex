import { h } from "preact";
import { HexColor } from "../types";

type Props = {
  width: number;
  height: number;
  stroke?: string | HexColor;
  fill?: string | HexColor;
};

const X = ({ width, height, stroke, fill }: Props) => {
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
      class="feather feather-x"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
};

export default X;
