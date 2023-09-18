# Contributing

If you want to add a new feature, please open an issue first to discuss what you would like to change. Bug fixes and documentation improvements do not require an issue, feel free to open a pull request directly.

## Development

1. Change the `.env.template` file to `.env.dev` and fill in a new OpenAI API key.

2. Run `npm install -g .` to install the package globally.

3. Run `wzd` to start the CLI.

Any changes you make to the code will be reflected in the CLI if you run `wzd`. This is only for development purposes. For production testing, use `wz` instead.

When you are done, run `npm uninstall -g .` to uninstall the package.
