import { h } from "preact";
import { HexColor } from "../types";
import BaseSvgIcon from "./BaseSvgIcon";

type Props = {
  width: number;
  height: number;
  stroke?: string | HexColor;
  fill?: string | HexColor;
};

const X = ({ width, height, stroke, fill }: Props) => {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </BaseSvgIcon>
  );
};

export default X;
