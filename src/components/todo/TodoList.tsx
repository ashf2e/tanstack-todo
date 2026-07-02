import type { Todo } from '#/types/todo'
import { TodoItem } from './TodoItem'

interface Props {
  todos: Todo[]

  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoList = ({ todos, onToggle, onDelete }: Props) => {
  if (todos.length === 0) {
    return (
      <div className="py-2 min-h-20 flex items-center justify-center">
        <p className="text-gray-500 text-4xl">No todos</p>
      </div>
    )
  }

  return (
    <ul className="py-2 space-y-2 flex flex-col">
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
