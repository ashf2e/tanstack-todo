import { cn } from '#/lib/utils'
import { useState } from 'react'

interface Props {
  onAdd: (text: string) => void
}

export const TodoInput = ({ onAdd }: Props) => {
  const [text, setText] = useState('')

  const handleAdd = () => {
    if (!text.trim()) return

    onAdd(text)

    setText('')
  }

  return (
    <div className={cn('flex gap-2 py-2')}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
        className={cn('border', 'rounded', 'px-3 py-2', 'flex-1')}
      />

      <button
        onClick={handleAdd}
        className={cn(
          'bg-black',
          'text-white',
          'rounded',
          'px-4',
          'bg-zinc-100 rounded-xl text-zinc-900 text-sm font-semibold',
          'flex items-center gap-2',
          'hover:scale-105 hover:bg-zinc-300',
          'cursor-pointer',
          'transition-all',
        )}
      >
        <span className="text-lg leading-none">+</span>
        ADD
      </button>
    </div>
  )
}
