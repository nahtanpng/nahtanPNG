import { AsciiLogoMark } from "./AsciiLogoMark";
import { AsciiWave } from "./AsciiWave";

const LOGO_EXCLUSION = { radiusX: 110, radiusY: 96, fade: 36 };

export function AsciiBanner() {
  return (
    <div
      aria-hidden="true"
      className="relative h-50 overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent),linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)]"
    >
      <AsciiWave exclusion={LOGO_EXCLUSION} className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <AsciiLogoMark />
      </div>
    </div>
  );
}
