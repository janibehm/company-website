import {ComposeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const servicesHero = defineType({
  name: 'servicesHero',
  title: 'Services Hero',
  type: 'object',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'body',
      media: 'image',
    },
  },
})