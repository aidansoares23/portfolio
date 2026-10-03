import javascript from '../assets/logos/javascript.svg'
import react from '../assets/logos/react.svg'
import nodejs from '../assets/logos/nodejs.svg'
import express from '../assets/logos/express.svg'
import firebase from '../assets/logos/firebase.svg'
import phaser from '../assets/logos/phaser.png'
import python from '../assets/logos/python.svg'
import git from '../assets/logos/git.svg'
import sql from '../assets/logos/sql.svg'

// Official marks, keyed by the name shown on the page. SVGs from Devicon (MIT);
// Phaser's own 16px pixel-art icon. Firestore is part of Firebase, so it uses Firebase's mark.
// SQL has no official mark, so it gets a Lucide-style database icon in the forest accent.
export const techLogos = {
  JavaScript: { src: javascript },
  React: { src: react },
  'Node.js': { src: nodejs },
  Express: { src: express },
  Firestore: { src: firebase },
  Firebase: { src: firebase },
  'Phaser 3': { src: phaser, pixelArt: true },
  Python: { src: python },
  SQL: { src: sql },
  Git: { src: git },
}
