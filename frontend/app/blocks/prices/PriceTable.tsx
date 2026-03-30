import {BlockContainer, BlockWrapper} from '../BlockLayout'
import ResolvedLink from '../../components/ResolvedLink'

type PriceRow = {
  _key: string
  product?: string
  description?: string
  price?: string
}

type LinkType = {
  _type: 'link'
  linkType?: 'href' | 'page' | 'post' | 'contact'
  href?: string
  page?: {_id: string; slug?: {current?: string}}
  post?: {_id: string; slug?: {current?: string}}
}

type CtaType = {
  text?: string
  link?: LinkType
}

type PriceTableProps = {
  block: {
    _type: string
    _key: string
    heading?: string
    subheading?: string
    cta?: CtaType
    rows?: PriceRow[]
    note?: string
  }
  index: number
  pageType: string
  pageId: string
}

export default function PriceTable({block}: PriceTableProps) {
  const {heading, subheading, cta, rows = [], note} = block

  return (
    <BlockWrapper className="py-16 md:py-24">
      <BlockContainer>
        {(heading || subheading) && (
          <div className="mb-10 md:mb-14">
            {heading && (
              <h2 className="text-3xl md:text-4xl font-semibold dark:text-white">{heading}</h2>
            )}
            {subheading && (
              <p className="mt-3 text-base text-black/60 dark:text-white/60 max-w-2xl">{subheading}</p>
            )}
            {cta?.text && cta?.link && (
              <ResolvedLink link={cta.link}>
                <button className="mt-5 px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded font-medium hover:opacity-80 transition-opacity">
                  {cta.text}
                </button>
              </ResolvedLink>
            )}
          </div>
        )}

        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row._key}
                  className={`flex flex-col sm:table-row border-b border-black/10 dark:border-white/10 ${
                    i === 0 ? 'border-t' : ''
                  }`}
                >
                  <td className="py-5 pr-6 align-top sm:w-1/2">
                    <span className="text-base font-semibold dark:text-white">{row.product}</span>
                    {row.description && (
                      <p className="mt-1 text-sm text-black/55 dark:text-white/55 leading-relaxed">
                        {row.description}
                      </p>
                    )}
                  </td>
                  <td className="pb-5 sm:py-5 sm:text-right align-top">
                    <span className="text-base font-semibold tabular-nums dark:text-white">
                      {row.price}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {note && (
          <p className="mt-6 text-sm text-black/45 dark:text-white/45">{note}</p>
        )}
      </BlockContainer>
    </BlockWrapper>
  )
}
