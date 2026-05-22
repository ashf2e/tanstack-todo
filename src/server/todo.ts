import { createServerFn } from "@tanstack/react-start"
import { getCookie, setCookie } from '@tanstack/react-start/server'

import { parseTodosCookie, TODO_COOKIE_KEY } from "#/utils/cookie"

export const getTodos = createServerFn()
  .handler(async () => {
    const cookie = getCookie(TODO_COOKIE_KEY)

    return parseTodosCookie(cookie)
  })

export const saveTodos = createServerFn({ method: 'POST' })
  .handler(async ({ data }) => {
    setCookie(
      TODO_COOKIE_KEY,
      JSON.stringify(data),
      {
        path: '/',
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7
      },
    )


    return {
      success: true
    }
  })
