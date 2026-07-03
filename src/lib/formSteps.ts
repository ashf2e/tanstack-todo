import type { Step } from '@/components/form/types'

export const formSteps: Step[] = [
  {
    title: '基本資料',

    fields: [
      {
        type: 'text',
        name: 'name',
        label: '姓名',
        defaultValue: '',
      },

      {
        type: 'text',
        name: 'email',
        label: 'Email',
        defaultValue: '',
      },

      {
        type: 'radio',
        name: 'gender',
        label: '性別',
        defaultValue: '',
        options: [
          {
            label: '男',
            value: 'male',
          },

          {
            label: '女',
            value: 'female',
          },
        ],
      },
    ],
  },

  {
    title: '個人資訊',

    fields: [
      {
        type: 'textarea',
        name: 'bio',
        label: '自我介紹',
        defaultValue: '',
      },
      {
        type: 'select',
        name: 'country',
        label: '國家',
        defaultValue: '',
        options: [
          {
            label: '台灣',
            value: 'tw',
          },

          {
            label: '日本',
            value: 'jp',
          },

          {
            label: '美國',
            value: 'us',
          },
        ],
      },
    ],
  },

  {
    title: '其他',

    fields: [
      {
        type: 'checkbox-group',
        name: 'skills',
        label: '技能',
        defaultValue: [],
        options: [
          {
            label: 'HTML',
            value: 'html',
          },
          {
            label: 'CSS',
            value: 'css',
          },
          {
            label: 'JavaScript',
            value: 'js',
          },
          {
            label: 'React',
            value: 'react',
          },
        ],
      },

      {
        type: 'checkbox',
        name: 'agreePrivacy',
        label: '同意隱私權政策',
        defaultValue: false,
      },

      {
        type: 'checkbox',
        name: 'agreeTerms',
        label: '同意服務條款',
        defaultValue: false,
      },

      {
        type: 'checkbox',
        name: 'subscribe',
        label: '我要訂閱電子報',
        defaultValue: false,
      },

      {
        type: 'file',
        name: 'resume',
        label: '履歷',
        defaultValue: null,
      },
    ],
  },
]
