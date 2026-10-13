import { cn } from "@/lib/cn";
import { type Exclusion, AsciiWave } from "./AsciiWave";

const EDGE_FADE =
  "[mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent),linear-gradient(to_bottom,transparent,black_15%,black_80%,transparent)]";

type AsciiBannerProps = {
  exclusion?: Exclusion;
  className?: string;
  maskClassName?: string;
  children?: React.ReactNode;
};

export function AsciiBanner({
  className = "h-50",
  maskClassName = EDGE_FADE,
  children = null
}: AsciiBannerProps) {
  return (
    <div className={cn("relative", className)}>
      <div aria-hidden="true" className={cn("absolute inset-0 overflow-hidden", maskClassName)}>
        <AsciiWave className="absolute inset-0" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}
