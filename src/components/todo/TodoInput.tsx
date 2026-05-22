import { cn } from "#/lib/utils"
import { useState } from "react"

interface Props {
  onAdd: (text: string) => void
}

export const TodoInput = ({ onAdd }: Props) => {
  const [text, setText] = useState('')

  const handleAdd = () => {
    if (!text.trim()) return

    onAdd(text)

    setText('')

    console.log('click')
  }

  return (
    <div className={cn(
      "flex gap-2"
    )}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
        className={cn(
          "border",
          "rounded",
          "px-3 py-2",
          "flex-1"
        )}
      />

      <button
        onClick={handleAdd}
        className={cn(
          "bg-black",
          "text-white",
          "rounded",
          "px-4"
        )}
      >
        Add
      </button>
    </div>
  )

}
