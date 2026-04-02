import SanityImage from '@/app/components/SanityImage'
import {BlockContainer, BlockWrapper} from '../BlockLayout'

type TechnologiesSectionProps = {
  block: {
    _type: string
    _key: string
    heading?: string
    subheading?: string
    body?: string
    integrations?: string[]
    tools?: string[]
    image?: {
      asset?: {_ref?: string; _id?: string}
      alt?: string
      hotspot?: {x: number; y: number; height: number; width: number}
      crop?: {top: number; bottom: number; left: number; right: number}
    } | null
  }
  index: number
  pageType: string
  pageId: string
}

function ToolCard({label}: {label: string}) {
  return (
    <div className="bg-black text-white dark:bg-white dark:text-black aspect-square flex items-center justify-center text-center p-4 text-sm md:text-base font-medium">
      {label}
    </div>
  )
}

export default function TechnologiesSection({block}: TechnologiesSectionProps) {
  const {
    heading = 'Kehitys & Teknologia',
    subheading = 'Nopea ja luotettava teknologia',
    body = 'Hyvät verkkosivut eivät ole vain visuaalisia. Taustalla tarvitaan myös teknologiaa, joka on nopea, turvallinen ja helppo ylläpitää.',
    integrations = ['yhteydenottolomakkeet', 'kartta- ja sijaintipalvelut', 'analytiikka', 'chatbotit', 'uutiskirje- ja CRM-integraatiot'],
    tools = ['NEXTJS', 'SANITY', 'Vercel', 'Matomo'],
  } = block

  return (
    <BlockWrapper className="py-10 md:py-24">
      <BlockContainer className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {(block.image?.asset?._id || block.image?.asset?._ref) ? (
          <div className="hidden md:block relative w-full max-w-[800px] aspect-[577/515]">
            <div className="absolute inset-0 bg-black translate-x-[-1.25rem] translate-y-[1.25rem]" />
            <div className="relative h-full w-full bg-black/10 dark:bg-white/15 overflow-hidden">
              <SanityImage
                id={(block.image.asset._id || block.image.asset._ref)!}
                hotspot={block.image.hotspot}
                crop={block.image.crop}
                alt={block.image.alt ?? ''}
                width={800}
                height={715}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="hidden md:block bg-black/10 dark:bg-white/15 p-8 md:p-10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-2 gap-6">
              {tools.map((tool) => (
                <ToolCard key={tool} label={tool} />
              ))}
            </div>
          </div>
        )}

        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight dark:text-white">{heading}</h2>
          {(block.image?.asset?._id || block.image?.asset?._ref) ? (
            <div className="md:hidden mt-6 mb-0 relative w-full max-w-[640px] mx-auto aspect-[577/515]">
              <div className="relative h-full w-full overflow-hidden">
                <SanityImage
                  id={(block.image.asset._id || block.image.asset._ref)!}
                  hotspot={block.image.hotspot}
                  crop={block.image.crop}
                  alt={block.image.alt ?? ''}
                  width={800}
                  height={715}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="md:hidden mt-6 mb-0 mx-2 bg-black/10 dark:bg-white/15 p-6 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-2 gap-4">
                {tools.map((tool) => (
                  <ToolCard key={tool} label={tool} />
                ))}
              </div>
            </div>
          )}
          <h3 className="mt-6 text-xl md:text-2xl font-semibold dark:text-white">{subheading}</h3>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-black/75 dark:text-white/75">{body}</p>

          <h4 className="mt-8 text-lg font-semibold dark:text-white">Esimerkki integraatioita</h4>
          <ul className="mt-3 list-disc pl-5 space-y-1 text-black/80 dark:text-white/80">
            {integrations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </BlockContainer>
    </BlockWrapper>
  )
}
