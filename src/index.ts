#!/usr/bin/env node
import { Command } from "commander";
import { printTree } from "./tree.js";
import path from "path";
import { existsSync, readFileSync } from "fs";
import gradient from "gradient-string";

const program = new Command();

program
  .name("fotree")
  .description("Beautiful folder tree CLI")
  .option("-d, --depth <number>", "Depth of the tree", "2")
  .action((options) => {
    const depth = parseInt(options.depth, 10);
    const cwd = process.cwd();

    let ignorePatterns: string[] = [];
    const gitignorePath = path.join(cwd, ".gitignore");
    if (existsSync(gitignorePath)) {
      ignorePatterns = readFileSync(gitignorePath, "utf-8")
        .split("\n")
        .filter(Boolean);
    }

    console.log(gradient.pastel.multiline(`📂 ${path.basename(cwd)}`));
    printTree(cwd, { depth, ignorePatterns });
  });

program.parse(process.argv);
