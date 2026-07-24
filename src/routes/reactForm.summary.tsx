import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useFormContext } from '#/hooks/useFormContext'
import { useEffect } from 'react'
import { formSteps } from '#/lib/formSteps'
import { FormSummary } from '#/components/form/FormSummary'

export const Route = createFileRoute('/reactForm/summary')({
  component: FormSummaryPage,
})

function FormSummaryPage() {
  const navigate = useNavigate()

  const { form, resetForm } = useFormContext()

  useEffect(() => {
    const hasData =
      Object.keys(form).length > 0 && form[formSteps[0].fields[0].name]

    if (!hasData) navigate({ to: '/reactForm' })
  }, [form, navigate])

  const handleReturn = () => {
    resetForm()
    navigate({ to: '/reactForm' })
  }

  return (
    <div className="m-auto w-full max-w-3xl space-y-6 rounded-xl border bg-white p-8 shadow">
      <div className="border-b pb-4 text-center">
        <h1 className="text-3xl font-bold text-green-600">🎉 表單送出成功</h1>
        <p className="mt-2 text-gray-500">以下是您填寫的資料總結</p>
      </div>

      <div className="rounded-lg bg-gray-50 p-6">
        <FormSummary form={form} steps={formSteps} />
      </div>

      <div className="flex justify-center pt-6">
        <button
          type="button"
          onClick={handleReturn}
          className="rounded-lg bg-blue-600 px-8 py-3 text-white transition hover:bg-blue-700"
        >
          返回並重新填寫表單
        </button>
      </div>
    </div>
  )
}
