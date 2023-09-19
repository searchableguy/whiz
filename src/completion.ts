import OpenAI from "openai";
import process from "node:process";
import { whizLLMModel } from "./utils.js";

export async function whatCommandToRun(
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) {
  const openai = new OpenAI();
  const response = await openai.chat.completions.create({
    model: whizLLMModel,
    messages: [
      {
        role: "system",
        content: `OS: ${process.platform}
Arch: ${process.arch}
shell: ${process.env.SHELL?.split("/").pop()}
You MUST NOT use functions that are not available.`,
      },
      ...messages,
    ],
    temperature: 0,
    functions: [
      {
        name: "shell",
        description: "Run a shell command",
        parameters: {
          type: "object",
          properties: {
            description: {
              type: "string",
              description:
                "A description of what this command will do. If it will cause any side effects, highlight with a warning.",
            },
            content: {
              type: "string",
              description:
                "The shell command to run (e.g. ls -l). Use appropriate command based on the shell and OS.",
            },
          },
        },
      },
    ],
  });

  return response;
}
