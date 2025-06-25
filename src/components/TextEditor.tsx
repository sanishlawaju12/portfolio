"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

interface EditorProps {
  onChange: (content: string) => void;
  defaultContent?: string;
}

export default function TextEditor({
  onChange,
  defaultContent = "",
}: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: defaultContent || "<p>Write something...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      if (!input.files?.[0]) return;
      const file = input.files[0];

      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch("http://localhost:8000/upload-image/", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.url) {
          editor?.chain().focus().setImage({ src: data.url }).run();
        }
      } catch (err) {
        console.error("Image upload failed", err);
      }
    };
  };

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={handleImageUpload}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Insert Image
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="border rounded p-2 min-h-[200px]"
      />
    </div>
  );
}
