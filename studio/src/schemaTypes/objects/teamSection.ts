import {UsersIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const teamSection = defineType({
  name: 'teamSection',
  title: 'Team Section',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'teamMember',
          title: 'Team Member',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
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
              title: 'name',
              subtitle: 'role',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Team Section'}
    },
  },
})
