import type {Metadata} from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
}

export default function ContactPage() {
  return (
    <section className="bg-white dark:bg-black py-8 md:py-16">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-8">
          <p className="text-label-xs mb-3 text-black/40 dark:text-white/40">
            Get in touch
          </p>
          <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.92] tracking-tight uppercase dark:text-white">
            Contact
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {/* Left: Form */}
          <div>
            <p className="text-label-sm max-w-sm mb-8 dark:text-white/80">
              Have a project in mind? Drop us a message and we&apos;ll get back to you.
            </p>
            <ContactForm />
          </div>

          {/* Right: Calendar booking */}
          <div className="flex flex-col gap-4">
            <p className="text-label-sm dark:text-white/80">
              Or book a meeting directly
            </p>
            <div className="w-full rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Replace the src below with your Google Calendar appointment scheduling link */}
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/PLACEHOLDER"
                width="100%"
                frameBorder="0"
                className="w-full h-[500px] min-h-[500px] lg:h-[450px] lg:min-h-[450px]"
                title="Book a meeting"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
