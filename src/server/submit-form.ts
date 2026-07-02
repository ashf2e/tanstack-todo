import { createServerFn } from '@tanstack/react-start'

export const submitForm = createServerFn({
  method: 'POST',
})
  .inputValidator((data) => {
    if (!(data instanceof FormData)) {
      throw new Error('Invalid form data')
    }

    return data
  })
  .handler(async ({ data }) => {
    console.log('=== form submit ===')

    for (const [key, value] of data.entries()) {
      if (value instanceof File) {
        console.log(key, {
          name: value.name,
          size: value.size,
          type: value.type,
        })
      } else {
        console.log(key, value)
      }
    }

    return {
      success: true,
      message: 'Form submitted successfully',
    }
  })
