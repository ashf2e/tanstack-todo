import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { submitForm } from '#/server/submit-form'
import { cn } from '#/lib/utils'
import { AnimatePresence, motion } from 'motion/react'

export const Route = createFileRoute('/reactForm')({
  component: RouteComponent,
})

type FromValue = {
  name: string
  email: string
  gender: string
  bio: string
  country: string
  skills: string[]
  resume: File | null
}

type Option = {
  label: string
  value: string
}

type Filed =
  | {
      type: 'text'
      name: keyof FromValue
      label: string
    }
  | {
      type: 'textarea'
      name: keyof FromValue
      label: string
    }
  | {
      type: 'select'
      name: keyof FromValue
      label: string
      options: Option[]
    }
  | {
      type: 'radio'
      name: keyof FromValue
      label: string
      options: Option[]
    }
  | {
      type: 'checkbox'
      name: keyof FromValue
      label: string
      options: Option[]
    }
  | {
      type: 'file'
      name: keyof FromValue
      label: string
    }

const formSteps = [
  {
    title: 'Step 1',
    fields: [
      {
        name: 'name',
        label: '姓名',
        type: 'text',
      },
      {
        name: 'email',
        label: 'Email',
        type: 'text',
      },
      {
        name: 'gender',
        label: '性別',
        type: 'radio',
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
    ] as Filed[],
  },
  {
    title: 'Step 2',
    fields: [
      {
        name: 'bio',
        label: '自我介紹',
        type: 'textarea',
      },
      {
        name: 'country',
        label: '國家',
        type: 'select',
        options: [
          { label: '台灣', value: 'tw' },
          { label: '日本', value: 'jp' },
          { label: '美國', value: 'us' },
        ],
      },
    ] as Filed[],
  },
  {
    title: 'Step 3',
    fields: [
      {
        name: 'skills',
        label: '技能',
        type: 'checkbox',
        options: [
          { label: 'HTML', value: 'html' },
          { label: 'CSS', value: 'css' },
          { label: 'JavaScript', value: 'js' },
          { label: 'React', value: 'react' },
        ],
      },
      {
        name: 'resume',
        label: '履歷',
        type: 'file',
      },
    ] as Filed[],
  },
]

const inputClass = cn(
  'w-full rounded-lg border border-gray-300 bg-white px-3 py-2',
  'outline-none transition-all',
  'focus:border-blue-500 focus:ring-2 focus:ring-blue-200',
  'disabled:cursor-not-allowed disabled:bg-gray-100',
)

const labelClass = 'text-sm font-medium text-gray-700'

const buttonClass = cn(
  'rounded-lg px-4 py-2 font-medium transition-colors',
  'disabled:cursor-not-allowed disabled:opacity-50',
)

function RouteComponent() {
  const [step, setStep] = useState(0)

  const [form, setForm] = useState<FromValue>({
    name: '',
    email: '',
    gender: '',
    bio: '',
    country: '',
    skills: [],
    resume: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateField = (
    name: keyof FromValue,
    value: string | string[] | File | null,
  ) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const renderField = (field: Filed) => {
    switch (field.type) {
      case 'text':
        return (
          <div key={field.name} className="space-y-2">
            <label className={labelClass}>{field.label}</label>

            <input
              type="text"
              value={form[field.name] as string}
              onChange={(e) => updateField(field.name, e.target.value)}
              className={inputClass}
            />
          </div>
        )

      case 'textarea':
        return (
          <div key={field.name} className="flex flex-col gap-2">
            <label className={labelClass}>{field.label}</label>

            <textarea
              rows={4}
              value={form[field.name] as string}
              onChange={(e) => updateField(field.name, e.target.value)}
              className={cn(inputClass, 'resize-none')}
            />
          </div>
        )

      case 'select':
        return (
          <div key={field.name} className="flex flex-col gap-2">
            <label className={labelClass}>{field.label}</label>

            <select
              value={form[field.name] as string}
              onChange={(e) => updateField(field.name, e.target.value)}
              className={inputClass}
            >
              <option value="">請選擇</option>

              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )

      case 'radio':
        return (
          <div key={field.name} className="flex flex-col gap-2">
            <div className={labelClass}>{field.label}</div>

            <div className="flex gap-4">
              {field.options.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
                >
                  <input
                    type="radio"
                    name={field.name}
                    checked={form[field.name] === option.value}
                    onChange={() => updateField(field.name, option.value)}
                  />

                  {option.label}
                </label>
              ))}
            </div>
          </div>
        )

      case 'checkbox':
        return (
          <div key={field.name} className="flex flex-col gap-2">
            <div className={labelClass}>{field.label}</div>

            <div className="flex flex-col gap-4">
              {field.options.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={form.skills.includes(option.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateField('skills', [...form.skills, option.value])
                      } else {
                        updateField(
                          'skills',
                          form.skills.filter((skill) => skill !== option.value),
                        )
                      }
                    }}
                  />

                  {option.label}
                </label>
              ))}
            </div>
          </div>
        )

      case 'file':
        return (
          <div key={field.name} className="flex flex-col gap-2">
            <label
              className={cn(
                'flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed',
                'border-gray-300 p-8 text-gray-500 transition',
                'hover:border-blue-500 hover:text-blue-500',
              )}
            >
              <input
                hidden
                type="file"
                onChange={(e) =>
                  updateField(field.name, e.target.files?.[0] || null)
                }
              />

              {form.resume ? form.resume.name : '點擊上傳履歷'}
            </label>
          </div>
        )

      default:
        return null
    }
  }

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

  return (
    <div className="mx-auto max-w-2xl rounded-xl border bg-white p-8 shadow">
      <div className="flex gap-2">
        {formSteps.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setStep(index)}
            className={cn(
              'flex-1 rounded-lg border px-4 py-3 transition',
              step === index ? 'bg-blue-500 text-white' : 'hover:bg-gray-100',
            )}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* <div className="space-y-6 pt-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">{formSteps[step].title}</h2>

          <p className="text-sm text-gray-500">
            Step {step + 1} / {formSteps.length}
          </p>
        </div>

        {formSteps[step].fields.map(renderField)}
      </div> */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: -40,
          }}
          transition={{
            duration: 0.25,
          }}
          className="space-y-6 pt-6"
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{formSteps[step].title}</h2>

            <p className="text-sm text-gray-500">
              Step {step + 1} / {formSteps.length}
            </p>
          </div>

          {formSteps[step].fields.map(renderField)}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between border-t pt-6">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((prev) => prev - 1)}
          className={cn(
            buttonClass,
            'border border-gray-300 bg-white hover:bg-gray-100',
          )}
        >
          上一步
        </button>

        {step !== formSteps.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((prev) => prev + 1)}
            className={cn(
              buttonClass,
              'bg-blue-600 text-white hover:bg-blue-700',
            )}
          >
            下一步
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className={cn(
              buttonClass,
              'bg-green-600 text-white hover:bg-green-700',
            )}
          >
            提交
          </button>
        )}
      </div>
    </div>
  )
}
