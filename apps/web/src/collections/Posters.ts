import type { Access, CollectionConfig } from 'payload'
import { hasRole, hiddenUnless, staff } from '@/access/roles'
import { slugField } from '@/fields/common'
import { revalidateOnChange, revalidateOnDelete } from '@/lib/revalidate'

/*
 * Newsletter posters (admin menu: Marketing center → Newsletter posters).
 * One poster, three ways to make it:
 *   1. Template  – upload a front and a back picture; the website shows a 3D card that flips.
 *   2. AI poster – type a prompt (and optional reference pictures); the picture is generated.
 *   3. Manual    – title, description and pictures typed in, like an event.
 * Every poster gets a public page (/newsletters/<slug>) and a share panel (email, WhatsApp, …).
 */

const publicPublished: Access = ({ req }) => {
  if (hasRole(req.user, 'admin', 'editor')) return true
  return { published: { equals: true } }
}

const when = (mode: string) => (data: Record<string, unknown> | undefined) => data?.mode === mode

export const NewsletterPosters: CollectionConfig = {
  slug: 'newsletter-posters',
  labels: { singular: 'Newsletter poster', plural: 'Newsletter posters' },
  admin: {
    group: 'Marketing center',
    hidden: hiddenUnless('admin', 'editor'),
    useAsTitle: 'title',
    defaultColumns: ['title', 'mode', 'published', 'updatedAt'],
    description:
      'Type the title and description, add pictures, then share the link by email, WhatsApp and more. Anyone who opens the link lands on the poster page of the website.',
  },
  access: { read: publicPublished, create: staff, update: staff, delete: staff },
  hooks: { afterChange: [revalidateOnChange], afterDelete: [revalidateOnDelete] },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField('title'),
    // The template and AI ways are switched off for now. The collapsibles below stay in the code, so they
    // can be turned back on by adding their options here again.
    {
      name: 'mode',
      type: 'radio',
      defaultValue: 'manual',
      required: true,
      admin: { hidden: true },
      options: [{ label: 'Type it in myself (title, description, pictures)', value: 'manual' }],
    },
    { name: 'summary', type: 'textarea', label: 'Description', admin: { description: 'Shown under the poster and in the link preview.' } },

    // ── 1 · Template ─────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Template (3D flip card)',
      admin: { condition: when('template') },
      fields: [
        { name: 'studio', type: 'ui', admin: { components: { Field: '/components/admin/PosterStudio#PosterStudio' } } },
        { name: 'frontImage', type: 'upload', relationTo: 'media', label: 'Front picture', admin: { description: 'Upload the template. The visitor sees this side first.' } },
        { name: 'backImage', type: 'upload', relationTo: 'media', label: 'Back picture (optional)', admin: { description: 'The other side of the card. Leave empty to show the text below on a plain back.' } },
        { name: 'frontHeadline', type: 'text', label: 'Headline on the front (optional)' },
        { name: 'backTitle', type: 'text', label: 'Title on the back' },
        { name: 'backText', type: 'textarea', label: 'Text on the back' },
        { name: 'accentColor', type: 'text', defaultValue: '#c8a24a', label: 'Accent colour', admin: { description: 'A colour code such as #c8a24a.' } },
        {
          name: 'animation',
          type: 'select',
          defaultValue: 'flip',
          label: '3D animation',
          options: [
            { label: 'Flip (click or hover to turn the card)', value: 'flip' },
            { label: 'Tilt (follows the mouse, click to flip)', value: 'tilt' },
            { label: 'Float (slow turning)', value: 'float' },
          ],
        },
      ],
    },

    // ── 2 · AI ───────────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'AI poster',
      admin: { condition: when('ai') },
      fields: [
        { name: 'aiPrompt', type: 'textarea', label: 'Prompt', admin: { description: 'Describe the poster: scene, mood, colours, style. Texts and names are better typed in the description above, because AI often misspells words inside pictures.' } },
        {
          name: 'aiStyle',
          type: 'select',
          defaultValue: 'poster',
          label: 'Style',
          options: [
            { label: 'Event poster', value: 'poster' },
            { label: 'Elegant and diplomatic', value: 'elegant' },
            { label: 'Concert stage', value: 'concert' },
            { label: 'Photo realistic', value: 'photo' },
          ],
        },
        { name: 'aiReferences', type: 'upload', relationTo: 'media', hasMany: true, label: 'Reference pictures (optional)', admin: { description: 'Pictures with the look you want. They are described to the AI, so the result follows their colours and mood.' } },
        { name: 'studio', type: 'ui', admin: { components: { Field: '/components/admin/PosterStudio#PosterStudio' } } },
        { name: 'generatedImage', type: 'upload', relationTo: 'media', label: 'Generated poster', admin: { description: 'The AI result is placed here. You can also replace it with your own picture.' } },
      ],
    },

    // ── 3 · Manual ───────────────────────────────────────────────
    {
      type: 'collapsible',
      label: 'Pictures and details',
      admin: { condition: when('manual') },
      fields: [
        { name: 'studio', type: 'ui', admin: { components: { Field: '/components/admin/PosterStudio#PosterStudio' } } },
        {
          name: 'images',
          type: 'array',
          label: 'Pictures',
          admin: { description: 'The first picture is the poster. More pictures show as a small gallery.' },
          fields: [
            { name: 'image', type: 'upload', relationTo: 'media', required: true },
            { name: 'caption', type: 'text' },
          ],
        },
        { name: 'eventDate', type: 'date', label: 'Date (optional)', admin: { date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'venueName', type: 'text', label: 'Place (optional)' },
        { name: 'ctaLabel', type: 'text', label: 'Button text (optional)', admin: { description: 'For example: Get tickets.' } },
        { name: 'ctaUrl', type: 'text', label: 'Button link (optional)' },
      ],
    },

    // ── Designed poster text (AI and manual modes) ───────────────
    {
      type: 'collapsible',
      label: 'Poster design: the words on the poster page',
      admin: {
        condition: (data: Record<string, unknown> | undefined) => data?.mode === 'ai' || data?.mode === 'manual',
        initCollapsed: false,
      },
      fields: [
        { name: 'designed', type: 'checkbox', defaultValue: true, label: 'Show as a designed poster page', admin: { description: 'The website builds the full poster: headline, numbers, quote, boxes and button, with the picture above as the main image. Real text, so nothing is misspelled.' } },
        { name: 'brandName', type: 'text', defaultValue: 'Nordic Affairs Media', label: 'Name at the top' },
        { name: 'brandTagline', type: 'text', label: 'Line under the name (optional)' },
        { name: 'greeting', type: 'text', label: 'Greeting', defaultValue: 'Hi,' },
        { name: 'intro', type: 'textarea', label: 'Introduction' },
        { name: 'highlight', type: 'text', label: 'Highlighted words (optional)', admin: { description: 'Shown on a gold marker, for example: from first idea to the final stage.' } },
        {
          name: 'stats',
          type: 'array',
          label: 'Numbers (up to 4)',
          maxRows: 4,
          labels: { singular: 'Number', plural: 'Numbers' },
          admin: { initCollapsed: true },
          fields: [
            { name: 'value', type: 'text', required: true, label: 'Number', admin: { description: 'For example 5,000+ or 85%.' } },
            { name: 'label', type: 'text', required: true, label: 'What it counts' },
          ],
        },
        { name: 'quoteText', type: 'textarea', label: 'Quote (optional)' },
        { name: 'quoteName', type: 'text', label: 'Quote: name' },
        { name: 'quoteRole', type: 'text', label: 'Quote: role and country' },
        { name: 'featuresTitle', type: 'text', label: 'Title above the boxes', defaultValue: 'What you get' },
        {
          name: 'features',
          type: 'array',
          label: 'Boxes (up to 4)',
          maxRows: 4,
          labels: { singular: 'Box', plural: 'Boxes' },
          admin: { initCollapsed: true },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'text', type: 'text', label: 'Short text' },
          ],
        },
        { name: 'closingLine', type: 'text', label: 'Closing line', defaultValue: 'Whenever you are ready,' },
        { name: 'closingScript', type: 'text', label: 'Closing line, second part (slanted)', defaultValue: 'we would be glad to welcome you.' },
        { name: 'dButtonLabel', type: 'text', label: 'Button text', defaultValue: 'Join the programme' },
        { name: 'dButtonUrl', type: 'text', label: 'Button link', admin: { description: 'A full web address starting with https:// or a page of this site such as /en/events.' } },
      ],
    },

    { name: 'layers', type: 'json', admin: { hidden: true } },
    { name: 'overlay', type: 'number', defaultValue: 25, min: 0, max: 80, admin: { hidden: true } },

    // ── Share and publish ───────────────────────────────────────
    { name: 'published', type: 'checkbox', defaultValue: true, label: 'Show on the website', admin: { position: 'sidebar', description: 'Ticked = the poster page is public. Untick to keep it hidden (the link then shows “not found”).' } },
    { name: 'sharePanel', type: 'ui', admin: { position: 'sidebar', components: { Field: '/components/admin/PosterSharePanel#PosterSharePanel' } } },
    { name: 'eventPanel', type: 'ui', admin: { position: 'sidebar', components: { Field: '/components/admin/PosterEventPanel#PosterEventPanel' } } },
    { name: 'createdEvent', type: 'relationship', relationTo: 'events', admin: { position: 'sidebar', readOnly: true, description: 'The event made from this poster.' } },
  ],
}
