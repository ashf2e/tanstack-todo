import type { Todo } from "#/types/todo"

interface Props {
  todo: Todo

  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoItem = ({
  todo,
  onToggle,
  onDelete
}: Props) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => ontoggle(todo.id)}
      />

      <span
        className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-red-500"
      >
        Delete
      </button>
    </li>
  )
}

