import { type SchemaTypeDefinition } from 'sanity'
import { event } from './events'
import { siteSettings } from './siteSettings'
import { results } from './results'
import { gallery } from './gallery'
import { course } from './course'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [event, siteSettings, results, gallery, course],
}