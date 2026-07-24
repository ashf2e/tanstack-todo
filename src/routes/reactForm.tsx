import { createFileRoute, Outlet } from '@tanstack/react-router'
import { FormContext } from '#/hooks/useFormContext'
import { useForm } from '#/hooks/useForm'

export const Route = createFileRoute('/reactForm')({
  component: FormLayout,
})

function FormLayout() {
  const formState = useForm()

  return (
    <FormContext.Provider value={formState}>
      <div className="bg-gray-50 min-h-screen py-10">
        <Outlet />
      </div>
    </FormContext.Provider>
  )
}
