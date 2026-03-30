import {TagIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const priceTable = defineType({
  name: 'priceTable',
  title: 'Price Table',
  type: 'object',
  icon: TagIcon,
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
      name: 'cta',
      title: 'Call to Action (optional)',
      type: 'object',
      description: 'Add a button with custom text that links somewhere',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'e.g. "Get Started", "Learn More", "Contact Us"',
        }),
        defineField({
          name: 'link',
          title: 'Link',
          type: 'link',
        }),
      ],
    }),
    defineField({
      name: 'rows',
      title: 'Price Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'priceRow',
          title: 'Price Row',
          fields: [
            defineField({
              name: 'product',
              title: 'Product / Service',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g. "€1 200", "from €500", "on request"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'product', subtitle: 'price'},
          },
        }),
      ],
    }),
    defineField({
      name: 'note',
      title: 'Footer Note',
      type: 'string',
      description: 'Optional note shown below the table, e.g. "All prices excl. VAT"',
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {title: title || 'Price Table'}
    },
  },
})
