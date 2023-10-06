import chalk from "chalk";

export const version = "0.0.8-alpha.0";

export const about = `A copilot for your terminal.

${chalk.bold("USAGE")}
    wz <request>

${chalk.bold("OPTIONS")}
    -h, --help      Show this help message
    -v, --version   Show version

${chalk.bold("EXAMPLES")}
    $ wz list all files in current directory
    $ wz open example.com in chrome
    $ wz curl https://example.com and save to file
`;
