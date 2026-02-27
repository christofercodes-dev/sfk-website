// schemaTypes/siteSettings.ts
import { StarIcon } from '@sanity/icons' // En snygg stjärn-ikon

export const siteSettings = {
  name: 'siteSettings',
  type: 'document',
  title: 'Startsidans innehåll', // Det som står högst upp i dokumentet
  icon: StarIcon,
  fields: [
    {
      name: 'featuredEvents',
      type: 'array',
      title: 'Utvalda aktiviteter till startsidan',
      description: 'Här väljer du de aktiviteter som ska synas i de tre rutorna på förstasidan. Den översta i listan hamnar först.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'event' }],
          options: {
            // Gör att man bara kan välja aktiviteter som faktiskt är publicerade
            disableNew: true, 
          }
        },
      ],
      validation: (Rule: any) => Rule.max(3).warning('Du bör bara välja 3 stycken för att designen ska se bra ut.'),
    },
  ],
}