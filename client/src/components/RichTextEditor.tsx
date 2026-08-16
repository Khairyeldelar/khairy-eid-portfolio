import DOMPurify from "dompurify";
import { Bold, Code2, Eye, Heading2, ImagePlus, Italic, Link2, List, ListOrdered, Quote, Redo2, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onUploadImage?: (file: File) => Promise<string>;
  dir?: "rtl" | "ltr";
  placeholder?: string;
};

const clean = (html: string) => DOMPurify.sanitize(html, {
  USE_PROFILES: { html: true },
  ADD_ATTR: ["target", "rel"],
});

export default function RichTextEditor({ value, onChange, onUploadImage, dir = "rtl", placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!editorRef.current || editorRef.current.innerHTML === value) return;
    editorRef.current.innerHTML = value;
  }, [value]);

  const command = (name: string, commandValue?: string) => {
    editorRef.current?.focus();
    document.execCommand(name, false, commandValue);
    onChange(clean(editorRef.current?.innerHTML || ""));
  };

  const addLink = () => {
    const url = window.prompt("أدخل رابطًا صحيحًا");
    if (url) command("createLink", url);
  };

  const uploadImage = async (file?: File) => {
    if (!file || !onUploadImage) return;
    const url = await onUploadImage(file);
    editorRef.current?.focus();
    document.execCommand("insertHTML", false, `<img src="${url}" alt="" style="max-width:100%;height:auto;border-radius:12px;margin:16px 0" />`);
    onChange(clean(editorRef.current?.innerHTML || ""));
  };

  return <div className="rich-editor" dir={dir}>
    <div className="rich-toolbar" aria-label="أدوات تنسيق المحتوى">
      <Button type="button" size="icon" variant="ghost" onClick={() => command("bold")} title="عريض"><Bold size={16}/></Button>
      <Button type="button" size="icon" variant="ghost" onClick={() => command("italic")} title="مائل"><Italic size={16}/></Button>
      <Button type="button" size="icon" variant="ghost" onClick={() => command("formatBlock", "<h2>")} title="عنوان"><Heading2 size={16}/></Button>
      <Button type="button" size="icon" variant="ghost" onClick={() => command("insertUnorderedList")} title="قائمة"><List size={16}/></Button>
      <Button type="button" size="icon" variant="ghost" onClick={() => command("insertOrderedList")} title="قائمة مرقمة"><ListOrdered size={16}/></Button>
      <Button type="button" size="icon" variant="ghost" onClick={() => command("formatBlock", "<blockquote>")} title="اقتباس"><Quote size={16}/></Button>
      <Button type="button" size="icon" variant="ghost" onClick={addLink} title="رابط"><Link2 size={16}/></Button>
      <Button type="button" size="icon" variant="ghost" onClick={() => fileRef.current?.click()} title="إدراج صورة"><ImagePlus size={16}/></Button>
      <Button type="button" size="icon" variant="ghost" onClick={() => command("undo")} title="تراجع"><Undo2 size={16}/></Button>
      <Button type="button" size="icon" variant="ghost" onClick={() => command("redo")} title="إعادة"><Redo2 size={16}/></Button>
      <Button type="button" size="icon" variant={preview ? "default" : "ghost"} onClick={() => setPreview(current => !current)} title="معاينة"><Eye size={16}/></Button>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={event => uploadImage(event.target.files?.[0])}/>
    </div>
    {preview ? <article className="rich-preview prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: clean(value) }} /> : <div ref={editorRef} className="rich-surface" contentEditable suppressContentEditableWarning onInput={event => onChange(clean(event.currentTarget.innerHTML))} data-placeholder={placeholder || "اكتب محتوى المقال هنا…"} />}
  </div>;
}
