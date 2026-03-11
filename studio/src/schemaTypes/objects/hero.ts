import {defineField, defineType} from 'sanity'
import {StarIcon, ComposeSparklesIcon, ImageIcon, LinkIcon} from '@sanity/icons'

/**
 * Hero schema object. Used as a full-width hero section in the page builder.
 * Learn more: https://www.sanity.io/docs/studio/object-type
 */

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: StarIcon,
  groups: [
    {
      name: 'contents',
      icon: ComposeSparklesIcon,
      default: true,
    },
    {
      name: 'media',
      icon: ImageIcon,
    },
    {
      name: 'button',
      icon: LinkIcon,
    },
  ],
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small text displayed above the heading',
      group: 'contents',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'contents',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      group: 'contents',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContentTextOnly',
      group: 'contents',
    }),
    defineField({
      name: 'button',
      type: 'button',
      group: 'button',
    }),

    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      group: 'media',
      description: 'Upload a video file (MP4, WebM). If set, this will be shown instead of the image.',
      options: {
        accept: 'video/mp4,video/webm',
      },
    }),
    defineField({
      name: 'videoLoop',
      title: 'Loop video',
      type: 'boolean',
      group: 'media',
      description: 'Whether the video should loop continuously.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
      image: 'image.asset',
    },
    prepare(selection) {
      const {title, subtitle, image} = selection
      return {
        title: title || 'Untitled Hero',
        subtitle: subtitle || 'Hero',
        media: image || undefined,
      }
    },
  },
})
