#!/usr/bin/env node
import { main } from "../build/index.js";
import process from "node:process";

main(process.argv).catch(console.error);
