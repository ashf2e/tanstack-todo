import { cn } from '#/lib/utils'
import type { Todo } from '#/types/todo'

interface Props {
  todo: Todo

  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoItem = ({ todo, onToggle, onDelete }: Props) => {
  return (
    <li
      className={cn(
        'flex items-center gap-4 py-2 px-4 rounded border border-zinc-100 backdrop-blur-md bg-zinc-500 text-zinc-100',
      )}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <span
        className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
      >
        {todo.text}
      </span>

      <button onClick={() => onDelete(todo.id)} className="text-red-500">
        Delete
      </button>
    </li>
  )
}
