import type { Todo } from '#/types/todo'

export const TODO_COOKIE_KEY = 'todos'

export const parseTodosCookie = (value: string): Todo[] => {
  if (!value) return []

  try {
    return JSON.parse(value)
  } catch {
    return []
  }
}
