import type { Field } from './types'

import { TextField } from './fields/TextField'
import { TextareaField } from './fields/TextareaField'
import { SelectField } from './fields/SelectField'
import { RadioField } from './fields/RadioField'
import { FileField } from './fields/FileField'
import { CheckboxField } from './fields/CheckboxField'
import { CheckboxGroupField } from './fields/CheckboxGroupField'

type Props = {
  field: Field
  form: Record<string, unknown>
  updateField: (
    name: string,
    value: string | string[] | boolean | File | null,
  ) => void
}

export const FormField = ({ field, form, updateField }: Props) => {
  const handleChange = (value: string | string[] | boolean | File | null) =>
    updateField(field.name, value)

  const value = form[field.name]

  switch (field.type) {
    case 'text':
      return (
        <TextField
          field={field}
          value={value as string}
          onChange={handleChange}
        />
      )

    case 'textarea':
      return (
        <TextareaField
          field={field}
          value={value as string}
          onChange={handleChange}
        />
      )

    case 'select':
      return (
        <SelectField
          field={field}
          value={value as string}
          onChange={handleChange}
        />
      )

    case 'radio':
      return (
        <RadioField
          field={field}
          value={value as string}
          onChange={handleChange}
        />
      )

    case 'checkbox-group':
      return (
        <CheckboxGroupField
          field={field}
          value={value as string[]}
          onChange={handleChange}
        />
      )

    case 'checkbox':
      return (
        <CheckboxField
          field={field}
          value={value as boolean}
          onChange={handleChange}
        />
      )

    case 'file':
      return (
        <FileField
          field={field}
          value={value as File | null}
          onChange={handleChange}
        />
      )

    default:
      console.warn(`不支援的欄位類型： ${(field as any).type}`)
      return null
  }
}
