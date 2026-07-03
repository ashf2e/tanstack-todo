import type { Step, Field } from './types'

type Props = {
  form: Record<string, unknown>
  steps: Step[]
}

const renderValue = (
  field: Field,
  form: Record<string, unknown>,
): React.ReactNode => {
  const value = form[field.name]

  switch (field.type) {
    case 'text':
    case 'textarea':
      return (value as string) || '-'
    case 'select':
      return field.options.find((o) => o.value === value)?.label ?? '-'

    case 'radio':
      return field.options.find((o) => o.value === value)?.label ?? '-'

    case 'checkbox':
      return value ? '✅ 已勾選' : '❌ 未勾選'

    case 'checkbox-group': {
      const values = value as string[]

      if (!values.length) return '-'

      return values
        .map(
          (item) => field.options.find((o) => o.value === item)?.label ?? item,
        )
        .join('、')
    }

    case 'file': {
      const file = value as File | null

      if (!file) return '-'

      return (
        <div className="space-y-1">
          <div>{file.name}</div>

          <div className="text-sm text-muted-foreground">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </div>
        </div>
      )
    }

    default:
      return '-'
  }
}

export const FormSummary = ({ form, steps }: Props) => {
  return (
    <div className="space-y-8">
      {steps.map((step) => (
        <div key={step.title} className="space-y-4">
          <h3 className="border-b pb-2 text-lg font-semibold">{step.title}</h3>

          <div className="space-y-3">
            {step.fields.map((field) => (
              <div
                key={field.name}
                className="grid grid-cols-[120px_1fr] gap-4 rounded-lg border p-3"
              >
                <div className="font-medium">{field.label}</div>

                <div>{renderValue(field, form)}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
