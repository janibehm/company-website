import {ComposeSparklesIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const projectHero = defineType({
  name: 'projectHero',
  title: 'Project Hero',
  type: 'object',
  icon: ComposeSparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
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
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Project Hero',
        subtitle: subtitle || 'Project Hero',
        media,
      }
    },
  },
})
