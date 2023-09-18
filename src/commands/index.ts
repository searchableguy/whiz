import { shell } from "./shell.js";

export const commands: Record<
  string,
  (args: any) => unknown | Promise<unknown>
> = {
  shell,
};
