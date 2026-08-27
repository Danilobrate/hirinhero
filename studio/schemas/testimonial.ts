import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'testimonial', title: 'Testimonial', type: 'document',
  fields: [
    defineField({name: 'quote_me', title: 'Citat (CG)', type: 'text', validation: r => r.required()}),
    defineField({name: 'quote_en', title: 'Citat (EN)', type: 'text'}),
    defineField({name: 'name', title: 'Ime i prezime', type: 'string', validation: r => r.required()}),
    defineField({name: 'role', title: 'Pozicija', type: 'string'}),
    defineField({name: 'company', title: 'Kompanija', type: 'string'}),
    defineField({name: 'order', title: 'Redosljed', type: 'number', initialValue: 100})
  ],
  preview: {select: {title: 'name', subtitle: 'company'}}
});
