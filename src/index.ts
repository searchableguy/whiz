import { about, version } from "./about.js";
import { commands } from "./commands/index.js";
import { whatCommandToRun } from "./completion.js";
import { isOpenAiKeyInEnvironment } from "./utils.js";
import { oraPromise } from "ora";

export async function main(argv: string[]) {
  const [, , ...args] = argv;
  const command = args[0];

  if (!command || ["help", "--help", "-h"].includes(command)) {
    console.log(about);
    return;
  }

  if (["version", "--version", "-v"].includes(command)) {
    console.log(version);
    return;
  }

  if (!isOpenAiKeyInEnvironment) {
    console.log(
      "OpenAI API key is not set. Please set OPENAI_API_KEY in your environment."
    );
    return;
  }

  const content = args.join(" ");

  const response = await oraPromise(
    whatCommandToRun([
      {
        role: "user",
        content,
      },
    ]),
    "whiz is thinking..."
  );

  for (const choice of response.choices) {
    if (
      choice.finish_reason === "function_call" &&
      choice.message.function_call
    ) {
      const fnCall = choice.message.function_call;
      const execute = commands[fnCall.name];
      if (!execute) {
        console.error(`Sorry, I don't know how to do that. Please try again.`);
        return;
      }
      const args = JSON.parse(fnCall.arguments);
      return execute(args);
    }

    if (choice.finish_reason === "stop") {
      console.log(choice.message.content || "I don't know what to do");
      return;
    }

    if (choice.finish_reason === "length") {
      console.log("Sorry, that command is too long.");
      return;
    }
  }
}
