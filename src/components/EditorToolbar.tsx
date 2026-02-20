import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Link,
  List,
  ListOrdered,
  Code,
  Quote,
  Image,
  Minus,
  CheckSquare,
  Table,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

interface ToolbarAction {
  icon: React.ReactNode;
  label: string;
  prefix: string;
  suffix?: string;
  block?: boolean;
}

interface EditorToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  markdown: string;
  setMarkdown: (value: string) => void;
}

const EditorToolbar = ({ textareaRef, markdown, setMarkdown }: EditorToolbarProps) => {
  const actions: ToolbarAction[] = [
    { icon: <Bold size={16} />, label: "Bold", prefix: "**", suffix: "**" },
    { icon: <Italic size={16} />, label: "Italic", prefix: "_", suffix: "_" },
    { icon: <Strikethrough size={16} />, label: "Strikethrough", prefix: "~~", suffix: "~~" },
    { icon: <Heading1 size={16} />, label: "Heading 1", prefix: "# ", block: true },
    { icon: <Heading2 size={16} />, label: "Heading 2", prefix: "## ", block: true },
    { icon: <Heading3 size={16} />, label: "Heading 3", prefix: "### ", block: true },
    { icon: <Link size={16} />, label: "Link", prefix: "[", suffix: "](url)" },
    { icon: <Image size={16} />, label: "Image", prefix: "![alt](", suffix: ")" },
    { icon: <List size={16} />, label: "Unordered List", prefix: "- ", block: true },
    { icon: <ListOrdered size={16} />, label: "Ordered List", prefix: "1. ", block: true },
    { icon: <CheckSquare size={16} />, label: "Task List", prefix: "- [ ] ", block: true },
    { icon: <Quote size={16} />, label: "Blockquote", prefix: "> ", block: true },
    { icon: <Code size={16} />, label: "Code", prefix: "`", suffix: "`" },
    { icon: <Minus size={16} />, label: "Horizontal Rule", prefix: "\n---\n", block: true },
    { icon: <Table size={16} />, label: "Table", prefix: "| Header | Header |\n| ------ | ------ |\n| Cell   | Cell   |", block: true },
  ];

  const applyAction = (action: ToolbarAction) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = markdown.substring(start, end);

    let newText: string;
    let cursorPos: number;

    if (action.block) {
      const before = markdown.substring(0, start);
      const lineStart = before.lastIndexOf("\n") + 1;
      const needsNewline = lineStart < start && start > 0 ? "\n" : "";
      newText =
        markdown.substring(0, start) +
        needsNewline +
        action.prefix +
        (selected || "text") +
        markdown.substring(end);
      cursorPos = start + needsNewline.length + action.prefix.length + (selected || "text").length;
    } else {
      const wrapped = action.prefix + (selected || "text") + (action.suffix || "");
      newText = markdown.substring(0, start) + wrapped + markdown.substring(end);
      cursorPos = start + wrapped.length;
    }

    setMarkdown(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(markdown);
    toast.success("Markdown copied to clipboard!");
  };

  return (
    <div
      className="flex items-center gap-0.5 px-3 py-2 border-b overflow-x-auto flex-shrink-0"
      style={{
        background: "hsl(var(--toolbar-bg))",
        borderColor: "hsl(var(--toolbar-border))",
      }}
    >
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={() => applyAction(action)}
          title={action.label}
          className="p-1.5 rounded transition-colors text-muted-foreground hover:text-foreground"
          style={{ }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.background = "hsl(var(--toolbar-hover))";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.background = "transparent";
          }}
        >
          {action.icon}
        </button>
      ))}
      <div className="ml-auto">
        <button
          onClick={copyMarkdown}
          title="Copy Markdown"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors bg-primary text-primary-foreground hover:opacity-90"
        >
          <Copy size={14} />
          Copy
        </button>
      </div>
    </div>
  );
};

export default EditorToolbar;
