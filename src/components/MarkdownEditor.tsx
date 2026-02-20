import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import EditorToolbar from "./EditorToolbar";
import { FileText, Eye } from "lucide-react";

const DEFAULT_MD = `# Welcome to .md Editor ✨

Start typing or paste your **markdown** here!

## Features

- **Bold**, *italic*, and ~~strikethrough~~ text
- [Links](https://example.com) and images
- Code blocks with syntax highlighting

### Code Example

\`\`\`javascript
const greeting = "Hello, Markdown!";
console.log(greeting);
\`\`\`

### Task List

- [x] Create the editor
- [x] Add live preview
- [ ] Try it yourself!

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci

---

| Feature | Status |
| ------- | ------ |
| Bold    | ✅     |
| Italic  | ✅     |
| Links   | ✅     |
| Tables  | ✅     |
`;

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState(DEFAULT_MD);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-border" style={{ background: "hsl(var(--toolbar-bg))" }}>
        <div className="flex items-center gap-2">
          <FileText size={22} className="text-primary" />
          <h1 className="text-lg font-semibold font-mono tracking-tight">
            <span className="text-primary">.md</span> Editor
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-mono">
            {markdown.length} chars
          </span>
          <span className="text-xs text-muted-foreground font-mono opacity-60">
            by <a href="https://github.com/marufx86" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Maruf Khan Ornob</a>
          </span>
        </div>
      </header>

      {/* Toolbar */}
      <EditorToolbar
        textareaRef={textareaRef}
        markdown={markdown}
        setMarkdown={setMarkdown}
      />

      {/* Split Panes */}
      <div className="flex flex-1 min-h-0">
        {/* Editor */}
        <div className="flex flex-col w-1/2 border-r border-border">
          <div className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border" style={{ background: "hsl(var(--toolbar-bg))" }}>
            <FileText size={12} />
            EDITOR
          </div>
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 w-full resize-none p-5 font-mono text-sm leading-relaxed focus:outline-none placeholder:text-muted-foreground"
            style={{ background: "hsl(var(--editor-bg))" }}
            placeholder="Type or paste your markdown here..."
            spellCheck={false}
          />
        </div>

        {/* Preview */}
        <div className="flex flex-col w-1/2">
          <div className="flex items-center gap-1.5 px-4 py-2 text-xs font-mono text-muted-foreground border-b border-border" style={{ background: "hsl(var(--toolbar-bg))" }}>
            <Eye size={12} />
            PREVIEW
          </div>
          <div
            className="flex-1 overflow-auto p-6"
            style={{ background: "hsl(var(--preview-bg))" }}
          >
            <div className="markdown-preview max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {markdown}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
