// export type FormValue = {
//   name: string
//   email: string
//   gender: string

//   bio: string
//   country: string

//   skills: string[]

//   agreePrivacy: boolean
//   agreeTerms: boolean
//   subscribe: boolean

//   resume: File | null
// }

export type Option = {
  label: string
  value: string
}

// type BaseField = {
//   name: keyof FormValue
//   label: string
// }
type BaseField = {
  name: string
  label: string
}

export type TextField = BaseField & {
  type: 'text'
  defaultValue: string
}

export type TextareaField = BaseField & {
  type: 'textarea'
  defaultValue: string
}

export type SelectField = BaseField & {
  type: 'select'
  options: Option[]
  defaultValue: string
}

export type RadioGroupField = BaseField & {
  type: 'radio'
  options: Option[]
  defaultValue: string
}

export type CheckboxGroupField = BaseField & {
  type: 'checkbox-group'
  options: Option[]
  defaultValue: string[]
}

export type CheckboxField = BaseField & {
  type: 'checkbox'
  defaultValue: boolean
}

export type FileField = BaseField & {
  type: 'file'
  defaultValue: File | null
}

export type Field =
  | TextField
  | TextareaField
  | SelectField
  | RadioGroupField
  | CheckboxGroupField
  | CheckboxField
  | FileField

export type Step = {
  title: string
  fields: Field[]
}

export type FormData = Record<string, unknown>
