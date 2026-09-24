// sanity/schemaTypes/resultType.ts
import { defineField, defineType } from 'sanity'

export const results = defineType({
  name: 'result',
  title: 'Tävlingsresultat',
  type: 'document',
  fields: [
    defineField({ name: 'event', title: 'Tävlingens namn', type: 'string' }),
    defineField({ name: 'location', title: 'Plats', type: 'string' }),
    defineField({ name: 'date', title: 'Datum', type: 'date' }),
    defineField({ name: 'judge', title: 'Domare', type: 'string' }),
    defineField({ name: 'type', title: 'Provtyp', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Huvudbild (Hero)',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'description',
      title: 'Om tävlingen (Text)',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    // HÄR LÄGGER VI TILL EKIPAGEN
    defineField({
      name: 'teams',
      title: 'Ekipage & Placeringar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'placement', title: 'Placering (t.ex. 1:a)', type: 'string' },
            { name: 'name', title: 'Hund & Förare', type: 'string' },
            { name: 'resultText', title: 'Resultatdetaljer', type: 'string' },
            { name: 'photo', title: 'Bild på ekipaget', type: 'image', options: { hotspot: true } }
          ]
        }
      ]
    }),
  ],
})