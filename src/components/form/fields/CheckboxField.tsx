type Props = {
  field: {
    label: string
  }
  value: boolean
  onChange: (value: boolean) => void
}

export const CheckboxField = ({ field, value, onChange }: Props) => {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      {field.label}
    </label>
  )
}
