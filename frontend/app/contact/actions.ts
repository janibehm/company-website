'use server'

import {contactFormSchema} from './schema'

export type ContactFormState = {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT

  if (!formspreeEndpoint) {
    return {
      success: false,
      message: 'Contact form is not configured yet. Please try again later.',
    }
  }

  const gotcha = formData.get('_gotcha')

  if (typeof gotcha === 'string' && gotcha.trim().length > 0) {
    return {
      success: true,
      message: 'Thanks for reaching out! We\'ll get back to you soon.',
    }
  }

  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  }

  const result = contactFormSchema.safeParse(raw)

  if (!result.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: result.error.flatten().fieldErrors,
    }
  }

  const response = await fetch(formspreeEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(result.data),
  })

  if (!response.ok) {
    return {
      success: false,
      message: 'Something went wrong while sending your message. Please try again.',
    }
  }

  return {
    success: true,
    message: 'Thanks for reaching out! We\'ll get back to you soon.',
  }
}
