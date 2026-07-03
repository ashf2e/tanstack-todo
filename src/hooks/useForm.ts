import { useState } from 'react'

// import type { FormValue } from '@/components/form/types'
import { createInitialValue } from '@/components/form/createInitialValue'
import { formSteps } from '@/lib/formSteps'

import type { FormData } from '@/components/form/types'

// 改成帶資料進來，箭頭函數，根據資料本身欄位的類型去設定初始值
export function useForm() {
  // const [form, setForm] = useState<FormValue>(() => {
  //   return
  // })
  // const [form, setForm] = useState<FormValue>({
  //   name: '',
  //   email: '',
  //   gender: '',

  //   bio: '',
  //   country: '',

  //   skills: [],

  //   agreePrivacy: false,
  //   agreeTerms: false,
  //   subscribe: false,

  //   resume: null,
  // })

  const createInitial = () => createInitialValue(formSteps)

  const [form, setForm] = useState<FormData>(createInitial)

  const updateField = (name: string, value: unknown) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const resetForm = () => {
    setForm(createInitial())
  }

  return {
    form,
    updateField,
    resetForm,
  }
}
