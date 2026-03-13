'use client'

import {useState, useRef} from 'react'
import Link from 'next/link'
import SanityImage from '@/app/components/SanityImage'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import {BlockWrapper, BlockContainer} from './BlockLayout'

type ProjectsSectionBlock = ExtractPageBuilderType<'projectsSection'>

type ProjectsSectionProps = {
  block: ProjectsSectionBlock
  index: number
  pageId: string
  pageType: string
}

type Project = NonNullable<ProjectsSectionBlock['projects']>[number]

export default function ProjectsSection({block}: ProjectsSectionProps) {
  const {heading, subheading, projects: initialProjects} = block
  const [items, setItems] = useState<Project[]>(() => initialProjects ?? [])
  const [contentKey, setContentKey] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  if (!items.length) return null

  const isCarousel = items.length > 2

  const next = () => {
    setItems(prev => { const a = [...prev]; a.push(a.shift()!); return a })
    setContentKey(k => k + 1)
  }

  const prev = () => {
    setItems(prev => { const a = [...prev]; a.unshift(a.pop()!); return a })
    setContentKey(k => k + 1)
  }

  const goToIndex = (index: number) => {
    // index 0 and 1 are the current/background items, 2+ are the stacked cards
    // Always just move one card forward when clicking any stacked card
    if (index <= 1) return
    next()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        next()
      } else {
        prev()
      }
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <BlockWrapper>
      <BlockContainer>
        {(heading || subheading) && (
          <div className="mb-6">
            {heading && <h2 className="text-2xl md:text-3xl lg:text-4xl dark:text-white">{heading}</h2>}
            {subheading && <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{subheading}</p>}
          </div>
        )}

      <style>{`
        .ps-wrap {
          position: relative;
          width: 100%;
          padding-bottom: 50%;
          border-radius: 20px;
          overflow: hidden;
          background: #f5f5f5;
        }
        :global(.dark) .ps-wrap {
          background: #1a1a1a;
        }
        .ps-slide {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          overflow: hidden;
        }
        .ps-item {
          width: 25%;
          height: 62.5%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          border-radius: 20px;
          box-shadow: 0 30px 50px #505050;
          background-color: #333;
          transition: all 0.5s;
          overflow: hidden;
        }
        .ps-item:nth-child(1),
        .ps-item:nth-child(2) {
          top: 0;
          left: 0;
          transform: none;
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }
        .ps-item:nth-child(3)  { left: 50%; }
        .ps-item:nth-child(4)  { left: calc(50% + 27.5%); }
        .ps-item:nth-child(5)  { left: calc(50% + 55%); }
        .ps-item:nth-child(n+6){ left: calc(50% + 82.5%); opacity: 0; pointer-events: none; }
        .ps-item img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .ps-content {
          position: absolute;
          top: 50%;
          left: 12.5%;
          width: 40%;
          color: #eee;
          transform: translateY(-50%);
          display: none;
          z-index: 1;
        }
        .ps-item:nth-child(2) .ps-content {
          display: block;
        }
        .ps-name {
          font-size: clamp(1rem, 3.5vw, 2.5rem);
          text-transform: uppercase;
          font-weight: bold;
          opacity: 0;
          animation: psAnimate 1s ease-in-out forwards;
        }
        .ps-des {
          margin: 10px 0 0;
          font-size: clamp(0.7rem, 1.5vw, 0.95rem);
          line-height: 1.5;
          max-width: 380px;
          opacity: 0;
          animation: psAnimate 1s ease-in-out 0.3s forwards;
        }
        .ps-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 16px;
          font-size: clamp(0.65rem, 1.2vw, 0.85rem);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 600;
          color: #fff;
          opacity: 0;
          animation: psAnimate 1s ease-in-out 0.5s forwards;
          transition: opacity 0.2s;
        }
        .ps-link svg {
          transition: transform 0.3s ease;
        }
        .ps-link:hover {
          opacity: 0.7;
        }
        .ps-link:hover svg {
          transform: translateX(4px);
        }
        @keyframes psAnimate {
          from { opacity: 0; transform: translateY(50px); filter: blur(16px); }
          to   { opacity: 1; transform: none; filter: blur(0); }
        }
        .ps-buttons {
          display: none;
          gap: 12px;
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
        }
        @media (min-width: 768px) {
          .ps-buttons {
            display: flex;
          }
        }
        .ps-buttons button {
          width: 40px;
          height: 35px;
          border-radius: 8px;
          border: 2px solid rgba(0,0,0,0.74);
          background: rgba(255,255,255,0.578);
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
        }
        :global(.dark) .ps-buttons button {
          border-color: rgba(255,255,255,0.5);
          background: rgba(0,0,0,0.5);
          color: white;
        }
        .ps-buttons button:hover {
          border-color: rgba(255,255,255,0.74);
          transform: scale(1.1);
        }
        .ps-buttons button:active {
          transform: scale(1.02);
        }
      `}</style>

      <div 
        className="ps-wrap"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="ps-slide">
          {items.map((project, index) => (
            <div 
              key={project._id} 
              className="ps-item"
              onClick={() => goToIndex(index)}
              style={{ cursor: index > 1 ? 'pointer' : 'default' }}
            >
              {project.image?.asset && (
                <SanityImage
                  id={project.image.asset._ref}
                  alt={project.image.alt ?? project.title ?? ''}
                />
              )}
              <div key={contentKey} className="ps-content">
                {project.title && <div className="ps-name">{project.title}</div>}
                {project.description && <div className="ps-des">{project.description}</div>}
                {project.linkText && (
                  <Link 
                    href={project.link?.linkType === 'href' ? (project.link.href || '#') : `/${project.link?.page || project.link?.post || ''}`}
                    className="ps-link"
                    target={project.link?.linkType === 'href' ? '_blank' : undefined}
                    rel={project.link?.linkType === 'href' ? 'noopener noreferrer' : undefined}
                  >
                    {project.linkText}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {isCarousel && (
          <div className="ps-buttons">
            <button onClick={prev} aria-label="Previous">◁</button>
            <button onClick={next} aria-label="Next">▷</button>
          </div>
        )}
      </div>
      </BlockContainer>
    </BlockWrapper>
  )
}


