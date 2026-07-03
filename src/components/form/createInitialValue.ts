import type { Step, FormData } from './types'

export const createInitialValue = (steps: Step[]): FormData => {
  const result: FormData = {}

  for (const step of steps) {
    for (const field of step.fields) {
      result[field.name] = field.defaultValue
    }
  }

  return result
}
