import { cn } from '#/lib/utils'
import type { Field, FormValue } from './types'

type Props = {
  field: Field
  form: FormValue
  updateField: (
    name: keyof FormValue,
    value: string | string[] | boolean | File | null,
  ) => void
}

const textInputClass = cn(
  'w-full rounded-lg border px-3 py-2 outline-none transition focus:border-blue-500',
)

const optionInputClass = cn(
  'flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-50',
)

export function FormField({ field, form, updateField }: Props) {
  switch (field.type) {
    case 'text':
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">{field.label}</label>

          <input
            type="text"
            className={textInputClass}
            value={form[field.name] as string}
            onChange={(e) => updateField(field.name, e.target.value)}
          />
        </div>
      )

    case 'textarea':
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">{field.label}</label>

          <textarea
            rows={4}
            className={textInputClass}
            value={form[field.name] as string}
            onChange={(e) => updateField(field.name, e.target.value)}
          />
        </div>
      )

    case 'select':
      return (
        <div className="space-y-2">
          <label className="block text-sm font-medium">{field.label}</label>

          <select
            className={textInputClass}
            value={form[field.name] as string}
            onChange={(e) => updateField(field.name, e.target.value)}
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
        <div className="space-y-2">
          <div className="text-sm font-medium">{field.label}</div>

          <div className="flex gap-3">
            {field.options.map((option) => (
              <label key={option.value} className={optionInputClass}>
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

    case 'checkbox-group':
      return (
        <div className="space-y-2">
          <div className="text-sm font-medium">{field.label}</div>

          <div className="flex flex-wrap gap-3">
            {field.options.map((option) => (
              <label key={option.value} className={optionInputClass}>
                <input
                  type="checkbox"
                  checked={form.skills.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateField('skills', [...form.skills, option.value])
                    } else {
                      updateField(
                        'skills',
                        form.skills.filter((item) => item !== option.value),
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

    case 'checkbox':
      return (
        <label className={optionInputClass}>
          <input
            type="checkbox"
            checked={form[field.name] as boolean}
            onChange={(e) => updateField(field.name, e.target.checked)}
          />

          {field.label}
        </label>
      )

    case 'file':
      return (
        <div className="space-y-2">
          <label className="flex h-36 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed hover:border-blue-500">
            <input
              hidden
              type="file"
              onChange={(e) =>
                updateField(field.name, e.target.files?.[0] ?? null)
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
