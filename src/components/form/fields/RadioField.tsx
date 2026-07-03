import type { Option } from '@/components/form/types'

type Props = {
  field: {
    label: string
    options: Option[]
  }
  value: string
  onChange: (value: string) => void
}

export const RadioField = ({ field, value, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <label>{field.label}</label>

      <div className="flex gap-3">
        {field.options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
            />
          </label>
        ))}
      </div>
    </div>
  )
}
