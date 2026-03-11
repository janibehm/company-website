import {defineField, defineType} from 'sanity'
import {OlistIcon} from '@sanity/icons'

export const processSection = defineType({
  name: 'processSection',
  title: 'Process Section',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'processStep',
          title: 'Step',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'Asterisk ( ✳ )', value: 'asterisk'},
                  {title: 'Curly Braces ( { } )', value: 'curlyBraces'},
                  {title: 'Arrow ( → )', value: 'arrow'},
                  {title: 'Diamond ( ◆ )', value: 'diamond'},
                  {title: 'Circle ( ○ )', value: 'circle'},
                ],
                layout: 'radio',
              },
            }),
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
          preview: {
            select: {title: 'heading', subtitle: 'icon'},
            prepare({title, subtitle}) {
              return {title: title || 'Step', subtitle: subtitle}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'steps.0.heading'},
    prepare({title}) {
      return {title: title || 'Process Section', subtitle: 'Process Section'}
    },
  },
})
