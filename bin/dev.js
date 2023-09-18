#!/usr/bin/env tsx --env-file .env.dev
import { main } from "../src/index.ts";

main(process.argv).catch(console.error);
