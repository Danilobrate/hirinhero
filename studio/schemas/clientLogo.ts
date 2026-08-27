import {defineType, defineField} from 'sanity';

export default defineType({
  name: 'clientLogo', title: 'Logo klijenta', type: 'document',
  fields: [
    defineField({name: 'name', title: 'Naziv kompanije', type: 'string', validation: r => r.required()}),
    defineField({name: 'logo', title: 'Logo (opciono — bez njega se prikazuje naziv)', type: 'image'}),
    defineField({name: 'order', title: 'Redosljed', type: 'number', initialValue: 100})
  ]
});
