import type { Option } from '@/components/form/types'

type Props = {
  field: {
    label: string
    options: Option[]
  }
  value: string
  onChange: (value: string) => void
}

export const SelectField = ({ field, value, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <label>{field.label}</label>
      <select
        className="w-full rounded border px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
}
