import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'

import { parseTodosCookie, TODO_COOKIE_KEY } from '#/utils/cookie'
import type { Todo } from '#/types/todo'

export const getTodos = createServerFn().handler(async () => {
  const cookie = getCookie(TODO_COOKIE_KEY)

  console.log('cookie', cookie)
  return parseTodosCookie(cookie)
})

export const saveTodos = createServerFn({ method: 'POST' })
  .inputValidator((data: Todo[]) => data)
  .handler(async ({ data }) => {
    // throw redirect()
    setCookie(TODO_COOKIE_KEY, JSON.stringify(data), {
      path: '/',
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
    })

    return {
      success: true,
    }
  })
