'use client'

import {useActionState} from 'react'
import {submitContactForm, type ContactFormState} from './actions'

const initialState: ContactFormState = {
  success: false,
  message: '',
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

  if (state.success) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center"
      >
        <p className="text-lg font-medium dark:text-white">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} aria-busy={isPending} className="flex flex-col gap-6">
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {state.message && !state.success && (
        <p role="alert" aria-live="polite" className="text-sm text-red-500">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-[11px] uppercase tracking-[0.18em] font-semibold dark:text-white/80">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          aria-invalid={Boolean(state.errors?.name)}
          aria-describedby={state.errors?.name ? 'name-error' : undefined}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-black dark:focus:border-white dark:text-white"
        />
        {state.errors?.name && (
          <p id="name-error" className="text-xs text-red-500">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[11px] uppercase tracking-[0.18em] font-semibold dark:text-white/80">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby={state.errors?.email ? 'email-error' : undefined}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-black dark:focus:border-white dark:text-white"
        />
        {state.errors?.email && (
          <p id="email-error" className="text-xs text-red-500">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[11px] uppercase tracking-[0.18em] font-semibold dark:text-white/80">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? 'message-error' : undefined}
          className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-black dark:focus:border-white dark:text-white resize-none"
        />
        {state.errors?.message && (
          <p id="message-error" className="text-xs text-red-500">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="self-start rounded-full font-mono text-sm whitespace-nowrap py-3 px-8 transition-colors duration-200 bg-black dark:bg-white hover:bg-blue focus:bg-blue text-white dark:text-black dark:hover:text-white disabled:opacity-50"
      >
        {isPending ? 'Sending...' : 'Send message'}
      </button>
    </form>
  )
}
