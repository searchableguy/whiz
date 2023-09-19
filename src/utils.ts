import { spawn, SpawnOptions } from "child_process";
import process from "node:process";

export async function executeShellCommand(
  command: string,
  options?: SpawnOptions
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, {
      shell: true,
      stdio: "inherit",
      ...options, // Merge user-provided options with default options
    });

    child.on("error", (error) => {
      reject(error);
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

export const isOpenAiKeyInEnvironment = !!process.env.OPENAI_API_KEY;

export const whizLLMModel = process.env.WHIZ_LLM_MODEL || "gpt-3.5-turbo";
