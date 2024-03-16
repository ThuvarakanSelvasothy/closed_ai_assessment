import * as React from "react";
import { SVGProps } from "react";
const Loader = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid"
    style={{
      margin: "auto",
      background: "transparent",
      display: "block",
      shapeRendering: "auto",
    }}
    viewBox="0 0 100 100"
    {...props}
  >
    <circle
      cx={50}
      cy={50}
      r={40}
      fill="none"
      stroke="#3a5a40"
      strokeDasharray="62.83185307179586 62.83185307179586"
      strokeLinecap="round"
      strokeWidth={11}
    >
      <animateTransform
        attributeName="transform"
        dur="1s"
        keyTimes="0;1"
        repeatCount="indefinite"
        type="rotate"
        values="0 50 50;360 50 50"
      />
    </circle>
  </svg>
);
export default Loader;
