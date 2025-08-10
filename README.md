# 📂 fotree

**fotree** is a beautiful, customizable CLI tool to display folder structures in your terminal — with depth control, gradient colors, icons, and `.gitignore` support.

---

## ✨ Features

- 📁 **Folder & file icons** for better visual clarity.
- 🎨 **Gradient colors** that change with folder depth for a layered 3D feel.
- 📜 **Depth control** with `--depth` flag.
- 🙈 **Respects `.gitignore`** — ignores files/folders listed there.
- ⚡ **Fast & lightweight** — written in TypeScript.

---

## 📦 Installation

Install globally via npm:

```bash
npm install -g fotree
```

---

## 🚀 Usage

Navigate to any folder and run:

```bash
fotree --depth=3
```

**Example:**

```
📂 my-project
├── 📁 src
│   ├── 📁 components
│   │   └── 📄 Button.tsx
│   └── 📄 index.ts
├── 📄 package.json
└── 📄 tsconfig.json
```

---

### CLI Options

| Option            | Description                  | Default |
| ----------------- | ---------------------------- | ------- |
| `-d, --depth <n>` | Maximum depth of folder tree | `2`     |

---
