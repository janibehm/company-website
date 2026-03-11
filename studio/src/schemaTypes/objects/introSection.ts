import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const introSection = defineType({
  name: 'introSection',
  title: 'Intro Section',
  type: 'object',
  icon: ImagesIcon,
  fields: [
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
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContentTextOnly',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled Intro Section',
        subtitle: 'Intro Section',
      }
    },
  },
})
