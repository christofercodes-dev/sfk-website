// schemaTypes/event.ts
export const event = {
  name: 'event',
  type: 'document',
  title: 'Aktiviteter',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Namn på aktivitet',
      description: 't.ex. "Träningsträff i Lövestad" eller "Vinterprov 2026"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featured',
      type: 'boolean',
      title: 'Prioriterad (Stjärnmärkt)',
      initialValue: false,
    },
    {
      name: 'date',
      type: 'datetime',
      title: 'Datum och tid',
      options: {
        step: 15,
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      type: 'string',
      title: 'Plats',
      placeholder: 't.ex. Snogeholm eller klubbstugan',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Beskrivning',
      description: 'Berätta vad som händer, samlingstid och eventuell kostnad.',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Bild',
      options: { hotspot: true },
    },
    {
      name: 'category',
      type: 'string',
      title: 'Kategori',
      options: {
        list: [
          { title: 'Träning', value: 'Träning' },
          { title: 'Jaktprov', value: 'Jaktprov' },
          { title: 'Utställning', value: 'Utställning' },
          { title: 'Möte', value: 'Möte' },
        ],
      },
    },
    {
      name: 'order',
      type: 'number',
      title: 'Sorteringsordning',
      description: 'Lågt nummer (t.ex. 1) visas först. Högre nummer hamnar längre ner.',
    }
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
      featured: 'featured',
    },
    prepare(selection: any) {
      const { title, date, media, featured } = selection;
      const d = new Date(date);
      
      // Formaterar datum och tid för subiteln i Sanity Studio
      const dateStr = d.toLocaleDateString('sv-SE');
      const timeStr = d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });

      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: `${dateStr} kl. ${timeStr}`,
        media: media
      };
    }
  },
}