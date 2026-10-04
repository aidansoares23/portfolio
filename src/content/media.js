import { responsive } from './image'

export const heroImage = {
  ...responsive('hero', [800, 1200, 1800]),
  alt: 'A dirt path leading into a misty forest of tall pines',
}

export const contactImage = {
  ...responsive('contact', [1200, 2000, 2800]),
  alt: 'Morning mist drifting through a valley of pine forest',
}

export const portraitImage = {
  ...responsive('portrait', [320, 640]),
  alt: 'Aidan Soares',
}

// Two same-size layers made by `npm run bear`: the body, and the raised paw that rotates at the wrist.
// TODO: stand-in photo; replace with an image you have the rights to before publishing.
export const bearImage = {
  body: responsive('bear-body', [260, 520]),
  paw: responsive('bear-paw', [260, 520]),
  alt: 'A bear cub waving from behind a branch',
}
