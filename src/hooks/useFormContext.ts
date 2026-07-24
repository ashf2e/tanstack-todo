import { createContext, useContext } from 'react'
import type { useForm } from './useForm'

type FormContextType = ReturnType<typeof useForm>
export const FormContext = createContext<FormContextType | null>(null)

export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext 必須在 FormContext.Provider 內使用')
  }
  return context
}
