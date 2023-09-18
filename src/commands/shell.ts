import Enquirer from "enquirer";
import { executeShellCommand } from "../utils.js";

interface ShellOptions {
  content: string;
  description: string;
}

export async function shell(options: ShellOptions) {
  const response = await Enquirer.prompt<{
    confirm: boolean;
  }>({
    type: "confirm",
    message: `${options.description}

Are you sure you want to run: ${options.content}?`,
    name: "confirm",
  });

  if (!response.confirm) {
    console.log("Aborting...");
    return;
  }
  const output = await executeShellCommand(options.content);
  console.log(output);
}
