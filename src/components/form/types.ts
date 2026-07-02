export type FormValue = {
  name: string
  email: string
  gender: string

  bio: string
  country: string

  skills: string[]

  agreePrivacy: boolean
  agreeTerms: boolean
  subscribe: boolean

  resume: File | null
}

export type Option = {
  label: string
  value: string
}

type BaseField = {
  name: keyof FormValue
  label: string
}

export type TextField = BaseField & {
  type: 'text'
}

export type TextareaField = BaseField & {
  type: 'textarea'
}

export type SelectField = BaseField & {
  type: 'select'
  options: Option[]
}

export type RadioGroupField = BaseField & {
  type: 'radio'
  options: Option[]
}

export type CheckboxGroupField = BaseField & {
  type: 'checkbox-group'
  options: Option[]
}

export type CheckboxField = BaseField & {
  type: 'checkbox'
}

export type FileField = BaseField & {
  type: 'file'
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
