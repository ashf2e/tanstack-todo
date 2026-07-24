import type { Option } from '../types'

type Props = {
  field: {
    label: string
    options: Option[]
  }
  value: string[]
  onChange: (value: string[]) => void
}

export const CheckboxGroupField = ({ field, value, onChange }: Props) => {
  const toggle = (v: string) => {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v))
    } else {
      onChange([...value, v])
    }
  }

  return (
    <div className="space-y-2">
      <label>{field.label}</label>

      <div className="flex gap-3 flex-wrap">
        {field.options.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={value.includes(option.value)}
              onChange={() => toggle(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}
