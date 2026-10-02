import type { SVGProps } from "react";

export function Logo({ size = 20, ...props }: Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number }) {
  return (
    <svg width={(size * 400) / 503} height={size} viewBox="0 0 400 503" aria-hidden="true" {...props}>
      <g fill="var(--faint)">
        <path d="M0 0.2H275.325V87.1H0Z" />
        <path d="M123.848 415.798H399.173V502.657H123.848Z" />
      </g>
      <g fill="currentColor">
        <path d="M0 0.2H89.784V266.571H0Z" />
        <path d="M309.352 244.268H399.174V501.222H309.352Z" />
        <path d="M1.527 0.2L91.349 140.209L308.276 502.699H399.174L309.351 351.279L99.35 0.2H1.527Z" />
      </g>
    </svg>
  );
}
