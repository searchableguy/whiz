import { promisify } from "node:util";
import { exec } from "node:child_process";
import process from "node:process";

const execAsync = promisify(exec);

export async function executeShellCommand(command: string): Promise<string> {
  const { stdout, stderr } = await execAsync(`${command} 2>&1`);
  if (stderr) {
    throw new Error(stderr);
  }
  return stdout.trim();
}

export const isOpenAiKeyInEnvironment = !!process.env.OPENAI_API_KEY;

export const whizLLMModel = process.env.WHIZ_LLM_MODEL || "gpt-3.5-turbo";
