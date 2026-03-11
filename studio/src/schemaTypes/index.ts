import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {project} from './documents/project'
import {callToAction} from './objects/callToAction'
import {hero} from './objects/hero'
import {infoSection} from './objects/infoSection'
import {introSection} from './objects/introSection'
import {projectsSection} from './objects/projectsSection'
import {processSection} from './objects/processSection'
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
  hero,
  infoSection,
  introSection,
  projectsSection,
  processSection,
  callToAction,
  link,
]
