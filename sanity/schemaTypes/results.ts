// sanity/schemaTypes/resultType.ts
import { defineField, defineType } from 'sanity'

export const results = defineType({
  name: 'result',
  title: 'Tävlingsresultat',
  type: 'document',
  fields: [
    defineField({
      name: 'event',
      title: 'Tävlingens namn',
      type: 'string',
      description: 'T.ex. Jaktprov'
    }),
    defineField({
      name: 'judge',
      title: 'Domare',
      type: 'string'
    }),
    defineField({
      name: 'type',
      title: 'Provtyp',
      type: 'string',
      description: 'T.ex. Jaktprov, Utställning'
    }),
    defineField({
      name: 'date',
      title: 'Datum',
      type: 'date'
    }),
    // sanity/schemaTypes/resultType.ts
    defineField({
      name: 'description',
      title: 'Resultatlista',
      type: 'array',
      of: [{ type: 'block' }], // Detta aktiverar "Word-läget"
      description: 'Här kan du formatera texten med fetstil, listor och rubriker.'
    }),
    defineField({
      name: 'image',
      title: 'Bild från tävlingen',
      type: 'image',
      options: { hotspot: true }
    }),
  ],
})