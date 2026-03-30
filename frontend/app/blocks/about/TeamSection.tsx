import SanityImage from '@/app/components/SanityImage'
import {BlockContainer, BlockWrapper} from '../BlockLayout'

type TeamMember = {
  _key: string
  name?: string
  role?: string
  image?: {
    asset?: {_ref?: string; _id?: string}
    alt?: string
    hotspot?: {x: number; y: number; height: number; width: number}
    crop?: {top: number; bottom: number; left: number; right: number}
  } | null
}

type TeamSectionProps = {
  block: {
    _type: string
    _key: string
    heading?: string
    members?: TeamMember[]
  }
  index: number
  pageType: string
  pageId: string
}

function MemberCard({member}: {member: TeamMember}) {
  const imageId = member.image?.asset?._id || member.image?.asset?._ref

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-[3/4] w-full bg-black/5 dark:bg-white/10 rounded-2xl overflow-hidden">
        {imageId && (
          <SanityImage
            id={imageId}
            hotspot={member.image?.hotspot}
            crop={member.image?.crop}
            alt={member.image?.alt ?? member.name ?? ''}
            width={600}
            height={800}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {member.name && (
        <h3 className="text-xl font-semibold dark:text-white">{member.name}</h3>
      )}
      {member.role && (
        <p className="text-sm text-black/60 dark:text-white/60 uppercase tracking-widest">{member.role}</p>
      )}
    </div>
  )
}

export default function TeamSection({block}: TeamSectionProps) {
  const {heading, members = []} = block

  return (
    <BlockWrapper className="py-16 md:py-24">
      <BlockContainer>
        {heading && (
          <h2 className="text-3xl md:text-4xl font-semibold mb-12 dark:text-white">{heading}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10">
          {members.map((member) => (
            <MemberCard key={member._key} member={member} />
          ))}
        </div>
      </BlockContainer>
    </BlockWrapper>
  )
}
