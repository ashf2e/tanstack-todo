import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import { submitForm } from '#/server/submit-form'
import { useForm } from '@/hooks/useForm'
import { formSteps } from '@/lib/formSteps'
import { FormField } from '@/components/form/FormField'

export const Route = createFileRoute('/reactFormtwo')({
  component: RouteComponent,
})

function RouteComponent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [stepStatus, setStepStatus] = useState<
    Record<number, 'complete' | 'error' | 'idle'>
  >({})

  const { form, updateField } = useForm()

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      const payload = new FormData()

      Object.entries(form).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            payload.append(key, item)
          })

          return
        }

        if (value instanceof File) {
          payload.append(key, value)

          return
        }

        payload.append(key, String(value))
      })

      const result = await submitForm({
        data: payload,
      })

      console.log(result)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateStep = (stepIndex: number) => {
    const fields = formSteps[stepIndex].fields

    const newErrors: Record<string, string> = {}

    fields.forEach((field) => {
      const value = form[field.name]

      if (
        field.type === 'text' ||
        field.type === 'textarea' ||
        field.type === 'select' ||
        field.type === 'radio'
      ) {
        if (!value || String(value).trim() === '') {
          newErrors[field.name] = '此欄位必填'
        }
      }

      if (field.type === 'checkbox-group') {
        if (!Array.isArray(value) || value.length === 0) {
          newErrors[field.name] = '至少選擇一項'
        }
      }

      if (field.type === 'checkbox') {
        if (value !== true) {
          newErrors[field.name] = '請勾選後才能繼續'
        }
      }

      if (field.type === 'file') {
        if (!value) {
          newErrors[field.name] = '請上傳檔案'
        }
      }
    })

    setErrors(newErrors)

    const isValid = Object.keys(newErrors).length === 0

    setStepStatus((prev) => ({
      ...prev,
      [stepIndex]: isValid ? 'complete' : 'error',
    }))

    return isValid
  }

  const handleStepChange = (targetStep: number) => {
    if (targetStep === currentStep) return

    if (targetStep < currentStep) {
      setCurrentStep(targetStep)
      return
    }

    const isValid = validateStep(currentStep)

    if (!isValid) return

    setStepStatus((prev) => ({
      ...prev,
      [currentStep]: 'complete',
    }))

    setCurrentStep(targetStep)
  }

  return (
    <div className="flex min-h-screen">
      <div className="m-auto w-full max-w-3xl space-y-8 rounded-xl border bg-white p-8 shadow">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <h2 className="text-xl font-bold">
              {formSteps[currentStep].title}
            </h2>
            <span>
              {currentStep + 1} / {formSteps.length}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded bg-gray-200">
            <div
              className="h-full bg-blue-500 transition-all"
              style={{
                width: `${((currentStep + 1) / formSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Step */}
        <div className="flex gap-2">
          {formSteps.map((item, index) => {
            const status = stepStatus[index]

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => handleStepChange(index)}
                disabled={index > 0 && stepStatus[index - 1] !== 'complete'}
                className={`flex-1 rounded-lg border px-4 py-3 transition ${
                  currentStep === index
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : status === 'complete'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : status === 'error'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-gray-300 text-gray-400'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  {status === 'complete' && '✔'}
                  {status === 'error' && '⚠'}
                  {item.title}
                </div>
              </button>
            )
          })}
        </div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -30,
            }}
            transition={{
              duration: 0.25,
            }}
            className="space-y-6"
          >
            {formSteps[currentStep].fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                form={form}
                updateField={updateField}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="flex justify-between border-t pt-6">
          <button
            type="button"
            onClick={() => handleStepChange(currentStep - 1)}
            disabled={currentStep === 0}
            className="rounded-lg border px-5 py-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            上一步
          </button>

          {currentStep === formSteps.length - 1 ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="rounded-lg bg-green-600 px-5 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? '提交中...' : '提交'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handleStepChange(currentStep + 1)}
              className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
            >
              下一步
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
