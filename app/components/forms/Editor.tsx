import { useEditor, EditorContent } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { HTMLAttributes } from "react"
import { VariantProps, cva, cx } from "~/utils/cva"
import { Box } from "../Box"

export const editorVariants = cva({
  base: "relative w-full rounded-md overflow-hidden transition",

  variants: {
    error: {
      true: "border-red",
    },
    plain: {
      true: "contents",
    },
  },

  defaultVariants: {
    error: false,
    plain: false,
  },
})

export const editorContentVariants = cva({
  base: "px-4 py-2 flex-1 max-w-none w-full text-foreground break-word focus:outline-none focus:ring-0",
})

// define your extension array
const extensions = [StarterKit]

export type TipTapProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof editorVariants> & {
    value?: string
    onChange?: (value: string) => void
  }

export const Tiptap = ({ className, value, onChange }: TipTapProps) => {
  const editor = useEditor({
    extensions,
    content: value,
    editorProps: {
      attributes: {
        class: editorContentVariants(),
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  return (
    <Box focusWithin>
      <EditorContent editor={editor} className={cx(editorVariants({ className }))} />
    </Box>
  )
}
