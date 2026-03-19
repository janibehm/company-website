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
      name: 'subheading',
      title: 'Subheading',
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
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
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
              name: 'backgroundColor',
              title: 'Background Color',
              type: 'string',
              description: 'CSS color for the image card background (e.g., #ec4899, #3b82f6)',
            }),
            defineField({
              name: 'items',
              title: 'List Items',
              type: 'array',
              of: [{type: 'string'}],
              hidden: true,
            }),
            defineField({
              name: 'linkText',
              title: 'Link Text',
              type: 'string',
              description: 'Text for the read more link (e.g., "Read more")',
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
              description: 'Where the read more link should point to',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              items: 'items',
              media: 'image',
            },
            prepare({title, items, media}) {
              return {
                title: title || 'Untitled Service',
                subtitle: items ? `${items.length} items` : 'No items',
                media,
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
