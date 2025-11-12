<template>
  <div v-if="editor" class="tiptap-editor border border-gray-300 rounded-lg overflow-hidden bg-white">
    <div class="toolbar bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-300 p-3">
      <div class="flex gap-2 flex-wrap">
        <div class="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
          <button
            type="button"
            @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'bg-gray-200': editor.isActive('bold') }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            title="Bold"
          >
            <Icon name="fa-solid:bold" class="text-gray-700" />
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'bg-gray-200': editor.isActive('italic') }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            title="Italic"
          >
            <Icon name="fa-solid:italic" class="text-gray-700" />
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleUnderline().run()"
            :class="{ 'bg-gray-200': editor.isActive('underline') }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            title="Underline"
          >
            <Icon name="fa-solid:underline" class="text-gray-700" />
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleStrike().run()"
            :class="{ 'bg-gray-200': editor.isActive('strike') }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            title="Strikethrough"
          >
            <Icon name="fa-solid:strikethrough" class="text-gray-700" />
          </button>
        </div>

        <div class="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
          <button
            type="button"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'bg-gray-200': editor.isActive('heading', { level: 1 }) }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors font-semibold text-sm"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'bg-gray-200': editor.isActive('heading', { level: 2 }) }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors font-semibold text-sm"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'bg-gray-200': editor.isActive('heading', { level: 3 }) }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors font-semibold text-sm"
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'bg-gray-200': editor.isActive('paragraph') }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors font-semibold text-sm"
            title="Paragraph"
          >
            P
          </button>
        </div>

        <div class="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
          <button
            type="button"
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'bg-gray-200': editor.isActive('bulletList') }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            title="Bullet List"
          >
            <Icon name="fa-solid:list-ul" class="text-gray-700" />
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'bg-gray-200': editor.isActive('orderedList') }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            title="Numbered List"
          >
            <Icon name="fa-solid:list-ol" class="text-gray-700" />
          </button>
          <button
            type="button"
            @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'bg-gray-200': editor.isActive('blockquote') }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            title="Quote"
          >
            <Icon name="fa-solid:quote-left" class="text-gray-700" />
          </button>
        </div>

        <div class="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
          <button
            type="button"
            @click="setLink"
            :class="{ 'bg-gray-200': editor.isActive('link') }"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            title="Insert Link"
          >
            <Icon name="fa-solid:link" class="text-gray-700" />
          </button>
          <button
            type="button"
            @click="editor.chain().focus().unsetLink().run()"
            :disabled="!editor.isActive('link')"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
            title="Remove Link"
          >
            <Icon name="fa-solid:unlink" class="text-gray-700" />
          </button>
        </div>

        <div class="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
          <button
            type="button"
            @click="triggerImageUpload"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            title="Insert Image"
          >
            <Icon name="fa-solid:image" class="text-gray-700" />
          </button>
          <button
            type="button"
            @click="addImageByUrl"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors"
            title="Insert Image URL"
          >
            <Icon name="fa-solid:link" class="text-gray-700" />
          </button>
        </div>

        <div class="flex gap-1 bg-white rounded-lg p-1 shadow-sm">
          <button
            type="button"
            @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().undo()"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
            title="Undo"
          >
            <Icon name="fa-solid:undo" class="text-gray-700" />
          </button>
          <button
            type="button"
            @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().redo()"
            class="px-3 py-2 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
            title="Redo"
          >
            <Icon name="fa-solid:redo" class="text-gray-700" />
          </button>
        </div>
      </div>
    </div>
    <EditorContent :editor="editor" class="tiptap-content" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const fileInput = ref<HTMLInputElement | null>(null);

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: 'text-blue-600 underline hover:text-blue-800',
      },
    }),
    Image.configure({
      inline: true,
      allowBase64: true,
      HTMLAttributes: {
        class: 'max-w-full h-auto rounded-lg my-4',
      },
    }),
  ],
  editorProps: {
    attributes: {
      class: 'p-6 min-h-[400px] bg-white focus:outline-none prose prose-sm sm:prose lg:prose-lg max-w-none',
    },
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML());
  },
});

const setLink = () => {
  const previousUrl = editor.value?.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  if (url === null) {
    return;
  }

  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }

  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
};

const addImageByUrl = () => {
  const url = window.prompt('Enter image URL:');
  
  if (url) {
    editor.value?.chain().focus().setImage({ src: url }).run();
  }
};

const triggerImageUpload = () => {
  if (!fileInput.value) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handleImageUpload;
    fileInput.value = input;
  }
  fileInput.value?.click();
};

const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const src = e.target?.result as string;
      if (src) {
        editor.value?.chain().focus().setImage({ src }).run();
      }
    };
    
    reader.readAsDataURL(file);
  }
};

watch(() => props.modelValue, (value) => {
  const isSame = editor.value?.getHTML() === value;
  if (!isSame && value !== undefined) {
    editor.value?.commands.setContent(value);
  }
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style>
.tiptap-content .ProseMirror {
  padding: 1.5rem;
  min-height: 400px;
  outline: none;
}

.tiptap-content .ProseMirror h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.tiptap-content .ProseMirror h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1.25rem;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.tiptap-content .ProseMirror h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.tiptap-content .ProseMirror p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.tiptap-content .ProseMirror ul,
.tiptap-content .ProseMirror ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

.tiptap-content .ProseMirror ul {
  list-style-type: disc;
}

.tiptap-content .ProseMirror ol {
  list-style-type: decimal;
}

.tiptap-content .ProseMirror li {
  margin-bottom: 0.25rem;
}

.tiptap-content .ProseMirror blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  margin: 1rem 0;
  font-style: italic;
  color: #6b7280;
}

.tiptap-content .ProseMirror a {
  color: #2563eb;
  text-decoration: underline;
}

.tiptap-content .ProseMirror a:hover {
  color: #1d4ed8;
}

.tiptap-content .ProseMirror strong {
  font-weight: 700;
}

.tiptap-content .ProseMirror em {
  font-style: italic;
}

.tiptap-content .ProseMirror u {
  text-decoration: underline;
}

.tiptap-content .ProseMirror s {
  text-decoration: line-through;
}

.tiptap-content .ProseMirror code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-family: monospace;
  font-size: 0.875em;
}

.tiptap-content .ProseMirror pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1rem 0;
}

.tiptap-content .ProseMirror pre code {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

.tiptap-content .ProseMirror img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
  cursor: pointer;
}

.tiptap-content .ProseMirror img.ProseMirror-selectednode {
  outline: 3px solid #ecbc85;
}
</style>
