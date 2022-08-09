import { h, VNode } from "preact";
import { HexColor } from "../types";

type Props = {
  width: number;
  height: number;
  viewBox: string;
  stroke?: string | HexColor;
  fill?: string | HexColor;
  strokeWidth?: number;
  strokeLinecap?: "butt" | "round" | "square";
  strokeLinejoin?: "arcs" | "bevel" | "miter" | "miter-clip" | "round";
  children: VNode | VNode[];
};

const BaseSvgIcon = ({
  width,
  height,
  viewBox,
  stroke,
  fill,
  strokeWidth,
  strokeLinecap,
  strokeLinejoin,
  children
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill || "black"}
      stroke={stroke || "black"}
      stroke-width={strokeWidth || 2}
      stroke-linecap={strokeLinecap}
      stroke-linejoin={strokeLinejoin}
    >
      {children}
    </svg>
  );
};

export default BaseSvgIcon;
