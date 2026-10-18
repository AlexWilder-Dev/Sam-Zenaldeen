// Everything the site states about the salon lives here.
// Prices: samzenaldeen.co.uk /services/barbering, /beards, /shaving, /grooming-packages.
// Hours: Google Maps listing (agrees with Fresha and VisitRichmond).
// Reviews: Google Maps listing, quoted as written, credited by first name and initial.

export type CategoryId = 'barbering' | 'shaving' | 'beards' | 'threading' | 'packages'

export interface Service {
  id: string
  name: string
  price: number
  category: CategoryId
  /** Shown as "from £x" */
  from?: boolean
  /** Their own wording under the item */
  note?: string
  /** For packages, bundles and Father & Son: the single services they stand in for */
  covers?: { id: string; count: number }[]
}

export const salon = {
  name: 'Sam Zenaldeen',
  fullName: "Sam Zenaldeen Gentlemen's Grooming",
  short: 'SZ',
  owner: 'Sam',
  address: {
    street: '119 Sheen Lane',
    area: 'East Sheen',
    city: 'London',
    postcode: 'SW14 8AE',
    lat: 51.4655267,
    lng: -0.2666719,
  },
  phone: { display: '020 8392 2954', tel: '+442083922954' },
  whatsapp: { display: '07969 109848', number: '447969109848' },
  email: 'sam@samzenaldeen.co.uk',
  web: 'samzenaldeen.co.uk',
  links: {
    directions:
      'https://www.google.com/maps/dir/?api=1&destination=Sam+Zenaldeen+Gentlemen%27s+Grooming%2C+119+Sheen+Lane%2C+London+SW14+8AE&destination_place_id=ChIJ6_eL744OdkgR1UCOFmI5pkE',
    map: 'https://www.google.com/maps/search/?api=1&query=Sam+Zenaldeen+Gentlemen%27s+Grooming&query_place_id=ChIJ6_eL744OdkgR1UCOFmI5pkE',
    reviews: 'https://search.google.com/local/reviews?placeid=ChIJ6_eL744OdkgR1UCOFmI5pkE',
  },
  /** Straight-line distances from OpenStreetMap coordinates */
  nearby: {
    station: { name: 'Mortlake station', metres: 290 },
    junction: { name: 'Upper Richmond Road West', metres: 110 },
  },
  /** Google Maps attribute */
  accessibleEntrance: true,
} as const

/** Opening hours by JS weekday (0 = Sunday). Minutes from midnight, London time. */
export const hours: { day: number; name: string; open: number; close: number }[] = [
  { day: 1, name: 'Monday', open: 8 * 60, close: 19 * 60 },
  { day: 2, name: 'Tuesday', open: 8 * 60, close: 19 * 60 },
  { day: 3, name: 'Wednesday', open: 8 * 60, close: 19 * 60 },
  { day: 4, name: 'Thursday', open: 8 * 60, close: 19 * 60 },
  { day: 5, name: 'Friday', open: 8 * 60, close: 19 * 60 },
  { day: 6, name: 'Saturday', open: 8 * 60, close: 18 * 60 },
  { day: 0, name: 'Sunday', open: 10 * 60, close: 17 * 60 },
]

export const categories: { id: CategoryId; title: string; intro: string }[] = [
  {
    id: 'barbering',
    title: 'Barbering',
    intro:
      'Every appointment begins with a detailed consultation: what you want from the visit, and honest advice on the style that will suit you. Then traditional barbering techniques, with precision and skill.',
  },
  {
    id: 'shaving',
    title: 'Shaving',
    intro:
      'The traditional cut-throat shave, with the finest products, so you leave relaxed and confident.',
  },
  {
    id: 'beards',
    title: 'Beards & Moustaches',
    intro:
      'Beard maintenance takes commitment and a professional eye. From a full, thick beard to mainly stubble, we advise, guide and shape it to suit you.',
  },
  {
    id: 'threading',
    title: 'Threading',
    intro: 'Listed with both the shaving and the beard services.',
  },
  {
    id: 'packages',
    title: 'Packages',
    intro: 'Combined visits and five-visit bundles. Group bookings available.',
  },
]

export const services: Service[] = [
  // Barbering
  { id: 'wash-cut-finish', name: 'Wash Cut & Finish', price: 33, category: 'barbering' },
  { id: 'teen-wash-cut-finish', name: 'Teen Wash Cut & Finish', price: 24, category: 'barbering', note: 'Under 18 years' },
  { id: 'clipper-one-grade', name: 'Clipper One Grade All Over', price: 18, category: 'barbering' },
  { id: 'luxury-clipper', name: 'Luxury Clipper All Over', price: 29, category: 'barbering', note: 'Includes wash and scalp massage' },
  {
    id: 'father-and-son',
    name: 'Father & Son',
    price: 51,
    category: 'barbering',
    note: 'Son under 18 years',
    covers: [
      { id: 'wash-cut-finish', count: 1 },
      { id: 'teen-wash-cut-finish', count: 1 },
    ],
  },
  { id: 'wash-blow-dry', name: 'Wash & Blow-Dry', price: 22, category: 'barbering' },

  // Shaving
  { id: 'luxury-shave', name: 'The SZ Luxury Hot Towel Shave', price: 41, category: 'shaving' },
  {
    id: 'express-shave',
    name: 'Express Hot Towel Shave',
    price: 26,
    category: 'shaving',
    note: 'Including a hot towel, followed by a traditional shave followed by facial massage',
  },

  // Beards
  { id: 'beard-shape', name: 'Beard, Moustache Shape & Contour', price: 24, category: 'beards' },
  { id: 'beard-trim', name: 'Beard & Moustache Trim', price: 14, category: 'beards' },

  // Threading
  { id: 'threading-cheeks', name: 'Threading Cheeks', price: 17, from: true, category: 'threading' },
  { id: 'threading-eyebrows', name: 'Threading Eyebrows', price: 17, from: true, category: 'threading' },

  // Packages
  {
    id: 'pkg-cut-shave',
    name: 'SZ Wash, Cut & Finish & Luxury Hot Towel Shave',
    price: 69,
    category: 'packages',
    covers: [
      { id: 'wash-cut-finish', count: 1 },
      { id: 'luxury-shave', count: 1 },
    ],
  },
  {
    id: 'pkg-cut-beard',
    name: 'SZ Wash, Cut & Finish, Beard & Moustache Shape & Contour',
    price: 51,
    category: 'packages',
    covers: [
      { id: 'wash-cut-finish', count: 1 },
      { id: 'beard-shape', count: 1 },
    ],
  },
  {
    id: 'bundle-5-cuts',
    name: '5 x SZ Wash, Cut & Finish',
    price: 128,
    category: 'packages',
    covers: [{ id: 'wash-cut-finish', count: 5 }],
  },
  {
    id: 'bundle-5-shaves',
    name: '5 x The SZ Luxury Hot Towel Shave',
    price: 166,
    category: 'packages',
    covers: [{ id: 'luxury-shave', count: 5 }],
  },
]

export const story = {
  paragraphs: [
    'Barbering runs in the family. Inspired by his brother Naz, who also owns a gentlemen’s grooming salon in London, Sam fulfilled his own ambition: a luxury barbers in Sheen. He brought fourteen years’ experience as a professional barber to it, and chose Sheen because he felt the area would benefit from a high-end gentlemen’s grooming salon.',
    'He built the business on two values, quality and customer service. Sam believes in really understanding what you want, then giving expert advice on what will suit you, so you leave confident, comfortable and happy, and most importantly looking sharp and dapper.',
  ],
  team:
    'Each member of the team is hand-picked for their skills, professionalism and commitment to exceptional customer service. Approachable, friendly, and proud of their work, with many years’ experience in barbering, shaving and beard trimming.',
  promise: 'A first-class experience from the moment you walk in to the minute you leave.',
}

export const reviews = {
  rating: 4.8,
  count: 200,
  /** Google's review topics: how many reviews mention each */
  topics: [
    { label: 'welcoming atmosphere', count: 13 },
    { label: 'free drinks', count: 7 },
    { label: 'welcoming staff', count: 7 },
    { label: 'hot towels', count: 6 },
    { label: 'family friendly', count: 6 },
    { label: 'keen eye to detail', count: 3 },
  ],
  quotes: [
    {
      id: 'jack',
      author: 'Jack G.',
      year: 2026,
      stars: 5,
      text: 'Had to switch barbershops as my barber moved away. I was very apprehensive about choosing a new spot to get my hair cut. Tried out Sam’s shop due to the glowing reviews and they were not wrong!',
      more: 'Complimentary refreshments and hot towels just make you feel at home…',
    },
    {
      id: 'daniel',
      author: 'Daniel H.',
      year: 2026,
      stars: 5,
      text: 'I’ve been going to Sam for over two years. Great service and always open for discussion on how to shape your hair. Highly recommend',
    },
    {
      id: 'oliver',
      author: 'Oliver M.',
      year: 2026,
      stars: 5,
      text: 'An exceptional, high quality barbers and Sam is a perfect gentleman. Knowledgeable and skilled.',
    },
    {
      id: 'peter',
      author: 'Peter R.',
      year: 2025,
      stars: 5,
      text: '…service provided by Sam himself was excellent. I feel appreciated as a customer, was pampered for as long as I was happy with the result…',
    },
    {
      id: 'lucy',
      author: 'Lucy W.',
      year: 2022,
      stars: 5,
      text: 'The service is warm, professional and personal. My son and husband both have their hair here and we are always happy.',
    },
  ],
}

export const serviceById = (id: string) => services.find((s) => s.id === id)
