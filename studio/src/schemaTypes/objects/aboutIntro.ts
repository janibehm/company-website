import {ComposeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const aboutIntro = defineType({
  name: 'aboutIntro',
  title: 'About Intro',
  type: 'object',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContentTextOnly',
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
      media: 'image',
    },
    prepare({title, media}) {
      return {title: title || 'About Intro', media}
    },
  },
})
