export type Grid = string[][];

export function grid(width: number, height: number): Grid {
  return Array.from({ length: height }, () => new Array<string>(width).fill(" "));
}

export function render(g: Grid) {
  return g.map((row) => row.join("")).join("\n");
}
