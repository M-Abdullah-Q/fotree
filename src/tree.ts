import fs from "fs";
import path from "path";
import pc from "picocolors";
import gradient from "gradient-string";
import ignore from "ignore";

interface TreeOptions {
  depth: number;
  ignorePatterns?: string[];
}

const folderIcon = "📁";
const fileIcon = "📄";

const folderGradients = [
  gradient.cristal,
  gradient.morning,
  gradient.teen,
  gradient.passion,
  gradient.vice,
];

function loadGitIgnore(cwd: string): string[] {
  const gitignorePath = path.join(cwd, ".gitignore");
  if (fs.existsSync(gitignorePath)) {
    return fs.readFileSync(gitignorePath, "utf-8").split("\n").filter(Boolean);
  }
  return [];
}

export function printTree(
  dirPath: string,
  options: TreeOptions,
  prefix = "",
  currentDepth = 0,
  ig = ignore()
) {
  if (currentDepth === 0 && options.ignorePatterns) {
    ig.add(options.ignorePatterns);
  }

  if (currentDepth > options.depth) return;

  const items = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter(
      (item) =>
        !ig.ignores(path.relative(dirPath, path.join(dirPath, item.name)))
    )
    .sort((a, b) => {
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;
      return a.name.localeCompare(b.name);
    });

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const branch = isLast ? "└── " : "├── ";

    let icon = item.isDirectory() ? folderIcon : fileIcon;
    let gradientFn =
      folderGradients[Math.min(currentDepth, folderGradients.length - 1)];

    let coloredName = item.isDirectory()
      ? typeof gradientFn === "function"
        ? gradientFn(item.name)
        : item.name
      : pc.green(item.name);

    console.log(prefix + branch + icon + " " + coloredName);

    if (item.isDirectory()) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      printTree(
        path.join(dirPath, item.name),
        options,
        newPrefix,
        currentDepth + 1,
        ig
      );
    }
  });
}
