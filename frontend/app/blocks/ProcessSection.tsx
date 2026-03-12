import {ExtractPageBuilderType} from '@/sanity/lib/types'
import {BlockWrapper, BlockContainer} from './BlockLayout'

type ProcessSectionBlock = ExtractPageBuilderType<'processSection'>
type Step = NonNullable<ProcessSectionBlock['steps']>[number]

const icons: Record<string, React.ReactNode> = {
  asterisk: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <line x1="14" y1="2" x2="14" y2="26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="2" y1="14" x2="26" y2="14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="4.93" y1="4.93" x2="23.07" y2="23.07" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="23.07" y1="4.93" x2="4.93" y2="23.07" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  ),
  curlyBraces: (
    <svg width="32" height="28" viewBox="0 0 32 28" fill="none" aria-hidden="true">
      <path d="M12 2C9 2 8 3.5 8 6v4c0 2.5-1.5 3.5-3 4 1.5.5 3 1.5 3 4v4c0 2.5 1 4 4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M20 2c3 0 4 1.5 4 4v4c0 2.5 1.5 3.5 3 4-1.5.5-3 1.5-3 4v4c0 2.5-1 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  arrow: (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
      <line x1="0" y1="10" x2="24" y2="10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M16 2l10 8-10 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  diamond: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="12" y="1" width="15" height="15" rx="1" transform="rotate(45 12 1)" stroke="currentColor" strokeWidth="2.2"/>
    </svg>
  ),
  circle: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.2"/>
    </svg>
  ),
}

function StepColumn({step}: {step: Step}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {step.icon && icons[step.icon] && (
          <span className="shrink-0 dark:text-white">{icons[step.icon]}</span>
        )}
        {step.heading && (
          <h3 className="text-base font-bold uppercase tracking-wider dark:text-white">{step.heading}</h3>
        )}
      </div>
      {step.items && step.items.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {step.items.map((item, i) => (
            <li key={i} className="text-sm text-black/70 dark:text-white/70 leading-snug">{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

type ProcessSectionProps = {
  block: ProcessSectionBlock
  index: number
  pageId: string
  pageType: string
}

export default function ProcessSection({block}: ProcessSectionProps) {
  const {steps} = block
  if (!steps || steps.length === 0) return null

  return (
    <BlockWrapper className="py-0 md:py-0 border-y border-black/10 dark:border-white/10">
      <BlockContainer className="py-12">
        <div
          className="grid gap-10"
          style={{gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`}}
        >
          {steps.map((step) => (
            <StepColumn key={step._key} step={step} />
          ))}
        </div>
      </BlockContainer>
    </BlockWrapper>
  )
}
