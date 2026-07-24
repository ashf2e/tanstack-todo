import { FileUpload } from '../FileUpload'
import type { Field } from '../types'

type Props = {
  field: Field
  value: File | null
  onChange: (value: File | null) => void
}

export const FileField = ({ field, value, onChange }: Props) => {
  return (
    <div>
      <label>{field.label}</label>

      <FileUpload value={value} onChange={onChange} />
    </div>
  )
}
