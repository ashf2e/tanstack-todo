import type { Todo } from "#/types/todo"
import { TodoItem } from "./TodoItem"

interface Props {
  todos: Todo[]

  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoList = ({
  todos,
  onToggle,
  onDelete
}: Props) => {
  if (todos.length === 0) {
    return (
      <p className="text-gray-500">No todos</p>
    )
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

