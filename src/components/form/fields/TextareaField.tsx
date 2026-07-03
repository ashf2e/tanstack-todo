type Props = {
  field: {
    label: string
  }
  value: string
  onChange: (value: string) => void
}

export const TextareaField = ({ field, value, onChange }: Props) => {
  return (
    <div className="space-y-2">
      <label>{field.label}</label>
      <textarea
        className="w-full rounded border px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
