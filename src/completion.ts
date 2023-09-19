import OpenAI from "openai";
import process from "node:process";

export async function whatCommandToRun(
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) {
  const openai = new OpenAI();
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `OS: ${process.platform}
        Arch: ${process.arch}
        shell: ${process.env.SHELL?.split("/").pop()}
        You will only be able to run commands that are available in your shell. You MUST NOT use functions that are not available.
            `,
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
                "A description of what this command will do and what it will return. If it will cause any side effects or destruction, please mention them here.",
            },
            content: {
              type: "string",
              description:
                "The shell command to run (e.g. ls -l). Use appropriate command depending on the shell and OS.",
            },
          },
        },
      },
    ],
  });

  return response;
}
