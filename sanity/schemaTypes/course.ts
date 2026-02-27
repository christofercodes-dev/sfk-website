// schemaTypes/course.ts
export const course = {
    name: 'course',
    type: 'document',
    title: 'Kurser',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Kursnamn',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'description',
        type: 'text',
        title: 'Kort beskrivning',
        description: 'Visas i listan (max 150 tecken).',
      },
      {
        name: 'content',
        type: 'array',
        title: 'Fullständig information',
        of: [{ type: 'block' }], // Tillåter rik text (stycken, listor etc)
      },
      {
        name: 'image',
        type: 'image',
        title: 'Kursbild',
        options: { hotspot: true },
      },
      {
        name: 'price',
        type: 'string',
        title: 'Pris',
        placeholder: 't.ex. 1500 kr för medlemmar',
      },
      {
          name: 'status',
          type: 'string',
          title: 'Status',
          options: {
            list: [
              { title: 'Öppen för anmälan', value: 'open' },
              { title: 'Fullbokad', value: 'full' },
              { title: 'Planeras', value: 'planned' },
            ],
          },
          initialValue: 'planned'
        },
    ],
  }