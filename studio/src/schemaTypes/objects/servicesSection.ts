import {defineField, defineType, defineArrayMember} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export const servicesSection = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
      description: 'Text for the link to the services page (e.g., "View all services")',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'serviceCard',
          title: 'Service Card',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'List Items',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              items: 'items',
            },
            prepare({title, items}) {
              return {
                title: title || 'Untitled Service',
                subtitle: items ? `${items.length} items` : 'No items',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      services: 'services',
    },
    prepare({title, services}) {
      return {
        title: title || 'Untitled Services Section',
        subtitle: services ? `${services.length} service cards` : 'Services Section',
      }
    },
  },
})
