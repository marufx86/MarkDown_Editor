# .md Editor

A simple, beginner-friendly Markdown editor with a live preview. Write or paste text on one side, see the beautifully formatted result on the other — instantly.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/6fa83a0d-e738-4481-a4de-ae755cdab260" />


##  How to Use 

### What is Markdown?

Markdown is a lightweight way to format text using simple symbols. For example, wrapping a word in `**double asterisks**` makes it **bold**. This editor helps you learn and use Markdown without memorizing any syntax.

### Getting Started

1. **Open the app** — You'll see a split screen:
   - **Left side (EDITOR):** This is where you type or paste your text.
   - **Right side (PREVIEW):** This shows you how your text will look when formatted.

2. **Start typing** on the left side. Everything you type will appear formatted on the right side in real time.

### Using the Toolbar

The toolbar at the top has buttons for all common formatting options. You don't need to remember any Markdown syntax — just click a button!

| Button | What it does | Markdown it inserts |
| ------ | ------------ | ------------------- |
| **B** | Makes text **bold** | `**text**` |
| *I* | Makes text *italic* | `_text_` |
| ~~S~~ | ~~Strikethrough~~ text | `~~text~~` |
| H1 | Large heading | `# text` |
| H2 | Medium heading | `## text` |
| H3 | Small heading | `### text` |
| 🔗 | Insert a link | `[text](url)` |
| 🖼️ | Insert an image | `![alt](url)` |
| • | Bullet list | `- text` |
| 1. | Numbered list | `1. text` |
| ☑ | Task/checklist | `- [ ] text` |
| ❝ | Blockquote | `> text` |
| `<>` | Inline code | `` `text` `` |
| — | Horizontal line | `---` |
| ⊞ | Insert a table | Table template |

### How to Format Text

1. **Select text** in the editor (highlight it with your mouse).
2. **Click a toolbar button** (e.g., Bold).
3. The Markdown symbols will wrap around your selected text automatically.
4. The preview on the right updates instantly.

>  **Tip:** If you don't select any text first, clicking a button will insert placeholder text that you can replace.

### Copy Your Work

Click the **Copy** button (top-right of the toolbar) to copy your Markdown code to the clipboard. You can then paste it into GitHub, Notion, or any platform that supports Markdown.

### Example Workflow

1. Open the editor.
2. Type: `Hello World`
3. Select "Hello World" and click the **Bold** button.
4. The editor now shows: `**Hello World**`
5. The preview shows: **Hello World**

---

## 🔧 Technical Overview (How the Code Works)

This project is a client-side React application — there is **no backend server**. Everything runs in your browser.

### Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| **React 18** | UI component framework |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Fast build tool & dev server |
| **Tailwind CSS** | Utility-first CSS styling |
| **shadcn/ui** | Pre-built UI components |

### Project Structure

```
src/
├── components/
│   ├── MarkdownEditor.tsx   # Main editor component (split-pane layout)
│   ├── EditorToolbar.tsx    # Toolbar with formatting buttons
│   └── ui/                  # Reusable UI components (shadcn)
├── pages/
│   └── Index.tsx            # Entry page that renders the editor
├── index.css                # Global styles & CSS variables
└── main.tsx                 # App entry point
```

### Key Components

#### `MarkdownEditor.tsx`
- Manages the Markdown text state using React's `useState`.
- Renders a `<textarea>` (editor) and a `<ReactMarkdown>` preview side by side.
- Uses `react-markdown` with two plugins:
  - **`remark-gfm`** — Adds GitHub Flavored Markdown support (tables, task lists, strikethrough).
  - **`rehype-raw`** — Allows raw HTML within Markdown.

#### `EditorToolbar.tsx`
- Defines an array of formatting actions (bold, italic, headings, etc.).
- Each action specifies a `prefix` and optional `suffix` that wraps around selected text.
- Uses a `ref` to the textarea to read the cursor position and insert text at the correct location.
- The **Copy** button uses the browser's `navigator.clipboard.writeText()` API.

### Styling

- **CSS Variables** in `index.css` define the color scheme (`--editor-bg`, `--preview-bg`, `--toolbar-bg`, etc.).
- **Tailwind CSS** with semantic tokens ensures consistent theming.
- The `.markdown-preview` class in `index.css` styles the rendered Markdown output (headings, lists, code blocks, tables, etc.).

### No Backend Required

This is a purely frontend application. All processing happens in the browser:
- Text input → Markdown parsing → HTML rendering (all client-side).
- No data is sent to any server.
- No login or account needed.
- Your work stays in your browser until you copy it out.

---

## How to Run Locally

```sh
git clone https://github.com/marufx86/MarkDown_Editor.git
cd MarkDown_Editor
npm install
npm run dev
```

Open `localhost` in your browser.

---

**Connect with me [Maruf Khan Ornob](https://github.com/marufx86)**
