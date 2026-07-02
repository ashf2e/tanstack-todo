import type { Step } from '@/components/form/types'

export const formSteps: Step[] = [
  {
    title: '基本資料',

    fields: [
      {
        type: 'text',
        name: 'name',
        label: '姓名',
      },

      {
        type: 'text',
        name: 'email',
        label: 'Email',
      },

      {
        type: 'radio',

        name: 'gender',

        label: '性別',

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
      },

      {
        type: 'select',

        name: 'country',

        label: '國家',

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
      },

      {
        type: 'checkbox',

        name: 'agreeTerms',

        label: '同意服務條款',
      },

      {
        type: 'checkbox',

        name: 'subscribe',

        label: '我要訂閱電子報',
      },

      {
        type: 'file',

        name: 'resume',

        label: '履歷',
      },
    ],
  },
]
