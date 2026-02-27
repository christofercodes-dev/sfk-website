// schemaTypes/gallery.ts
export const gallery = {
    name: 'gallery',
    type: 'document',
    title: 'Galleri',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Titel/Namn',
        description: 'En kort titel för bilden (t.ex. "Träning i solnedgång")',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'image',
        type: 'image',
        title: 'Bild',
        options: {
          hotspot: true, // Tillåter dig att välja fokuspunkt i bilden
        },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternativ text',
            description: 'Beskriv bilden för skärmläsare (viktigt för tillgänglighet)',
          }
        ],
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'category',
        type: 'string',
        title: 'Kategori',
        options: {
          list: [
            { title: 'Träning', value: 'training' },
            { title: 'Jaktprov', value: 'competition' },
            { title: 'Gemenskap', value: 'social' },
          ],
        },
      },
      {
        name: 'date',
        type: 'date',
        title: 'Datum',
        initialValue: () => new Date().toISOString().split('T')[0],
      },
    ],
    preview: {
      select: {
        title: 'title',
        subtitle: 'category',
        media: 'image',
      },
    },
  }