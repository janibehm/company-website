import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {project} from './documents/project'
import {aboutFaq} from './objects/aboutFaq'
import {aboutIntro} from './objects/aboutIntro'
import {callToAction} from './objects/callToAction'
import {designSection} from './objects/designSection'
import {hero} from './objects/hero'
import {infoSection} from './objects/infoSection'
import {illustrationSection} from './objects/illustrationSection'
import {introSection} from './objects/introSection'
import {projectHero} from './objects/projectHero'
import {projectOverviewSection} from './objects/projectOverviewSection'
import {projectsSection} from './objects/projectsSection'
import {processSection} from './objects/processSection'
import {servicesHero} from './objects/servicesHero'
import {servicesSection} from './objects/servicesSection'
import {priceTable} from './objects/priceTable'
import {teamSection} from './objects/teamSection'
import {technologiesSection} from './objects/technologiesSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import button from './objects/button'
import {blockContentTextOnly} from './objects/blockContentTextOnly'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  project,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  aboutFaq,
  aboutIntro,
  designSection,
  hero,
  infoSection,
  illustrationSection,
  introSection,
  projectHero,
  projectOverviewSection,
  projectsSection,
  processSection,
  servicesHero,
  servicesSection,
  priceTable,
  teamSection,
  technologiesSection,
  callToAction,
  link,
]
