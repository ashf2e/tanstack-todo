import { createFileRoute } from '@tanstack/react-router'
import {
  useMemo,
  useState
} from 'react'
import type { Todo } from '#/types/todo'
import {
  TodoInput,
  TodoList,
  TodoToolbar
} from '#/components/todo'

import {
  getTodos,
  saveTodos
} from '#/server/todo'

export const Route = createFileRoute('/todos')({
  validateSearch: (
    search: Record<string, unknown>
  ) => ({
    q: typeof search.q === 'string' ? search.q : '',
    filter: search.filter === 'active' || search.filter === 'completed' ? search.filter : 'all',
    sort: search.sort === 'oldest' || search.sort === 'az' ? search.sort : 'newest'
  }),
  loader: async () => {
    return await getTodos()
  },
  component: TodoPage,
})

function TodoPage() {
  const initialTodos = Route.useLoaderData()

  const search = Route.useSearch()

  const navigate = Route.useNavigate()

  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const updateTodos = async (nextTodos: Todo[]) => {
    setTodos(nextTodos)

    try {
      await saveTodos({
        data: nextTodos
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddTodo = async (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now()
    }

    await updateTodos([...todos, newTodo])
  }

  const handleToggleTodo = async (id: string) => {
    const nextTodos = todos.map((todo) => {
      if (todo.id !== id) {
        return todo
      }

      return {
        ...todo,
        completed: !todo.completed
      }
    })

    await updateTodos(nextTodos)
  }

  const handleDeleteTodo = async (id: string) => {
    const nextTodos = todos.filter((todo) => todo.id !== id)

    await updateTodos(nextTodos)
  }

  const visibleTodos = useMemo(() => {
    let result = [...todos]

    result = result.filter((todo) => todo.text.toLowerCase().includes(search.q.toLowerCase()))

    if (search.filter === 'active') {
      result = result.filter((todo) => !todo.completed)
    }

    if (search.filter === 'completed') {
      result = result.filter((todo) => todo.completed)
    }

    if (search.sort === 'newest') {
      result.sort((a, b) => b.createdAt - a.createdAt)
    }

    if (search.sort === 'oldest') {
      result.sort((a, b) => a.createdAt - b.createdAt)
    }

    if (search.sort === 'az') {
      result.sort((a, b) => a.text.localeCompare(b.text))
    }

    return result
  }, [todos, search])


  return (
    <div>
      <h1>Todo List</h1>

      <TodoInput
        onAdd={handleAddTodo}
      />

      <TodoToolbar
        q={search.q}
        filter={search.filter}
        sort={search.sort}
        onSearch={(value) => navigate({
          to: '/todos',
          search: (prev) => ({ ...prev, q: value })
        })}
        onFilterChnage={(value) => navigate({
          to: '/todos',
          search: (prev) => ({ ...prev, filter: value })
        })}
        onSortChange={(value) => navigate({
          to: '/todos',
          search: (prev) => ({ ...prev, sort: value })
        })}
      />

      <TodoList
        todos={visibleTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  )
}
