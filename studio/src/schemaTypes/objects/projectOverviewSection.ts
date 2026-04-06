import {ThLargeIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const projectOverviewSection = defineType({
  name: 'projectOverviewSection',
  title: 'Project Overview Section',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 6,
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
      subtitle: 'subheading',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Project Overview Section',
        subtitle: subtitle || 'Project Overview Section',
        media,
      }
    },
  },
})
