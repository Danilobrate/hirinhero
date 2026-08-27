import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'post', title: 'Objava', type: 'document',
  fields: [
    defineField({name: 'title_me', title: 'Naslov (CG)', type: 'string', validation: r => r.required()}),
    defineField({name: 'title_en', title: 'Naslov (EN)', type: 'string'}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title_me'}, validation: r => r.required()}),
    defineField({name: 'date', title: 'Datum', type: 'date', validation: r => r.required()}),
    defineField({name: 'body_me', title: 'Tekst (CG)', type: 'text', validation: r => r.required()}),
    defineField({name: 'body_en', title: 'Tekst (EN)', type: 'text'}),
    defineField({name: 'published', title: 'Objavljeno', type: 'boolean', initialValue: false})
  ],
  preview: {select: {title: 'title_me', subtitle: 'date'}}
});
