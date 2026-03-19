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

  // TODO: Send email or save to database
  // e.g. await sendEmail(result.data)
  console.log('Contact form submission:', result.data)

  return {
    success: true,
    message: 'Thanks for reaching out! We\'ll get back to you soon.',
  }
}
