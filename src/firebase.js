import firebase from 'firebase'
// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: 'AIzaSyDHY9IPIaTKPVcrOrTRbKm1tOQag4jk-xE',
  authDomain: 'projeto-tcc-333d6.firebaseapp.com',
  databaseURL: 'https://projeto-tcc-333d6.firebaseio.com',
  projectId: 'projeto-tcc-333d6',
  storageBucket: 'projeto-tcc-333d6.appspot.com',
  messagingSenderId: '264938431096'
}
firebase.initializeApp(config)
export const db = firebase.firestore()
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

export const createDb = () => {
  db
    .collection('blocks')
    .add(blocks)

  let blocksRef = db.collection('blocks')
  let getBlocks = blocksRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data())
      })
    })
    .catch(err => {
      console.log('Error getting document', err)
    })
}

const blocks = {
  block1: {
    binary: [
      1,
      1,
      1,
      -1,
      1,
      -1
    ],
    data: [],
    linked: false,
    links: [],
    name: 'Data',
    neededLinks: 0,
    paused: false,
    position: {
      x: 200,
      y: 480
    },
    priority: 1,
    requiredLinks: ['None'],
    type: 'square',
    updated: false
  },
  block2: {
    amplitude: 3,
    data: [],
    frequency: 12,
    linked: false,
    links: [],
    name: 'Carrier Wave',
    neededLinks: 0,
    paused: false,
    position: {
      x: 0,
      y: 400
    },
    priority: 1,
    requiredLinks: ['None'],
    type: 'sine',
    updated: false,
    description: 'A carrier wave, carrier signal, or just carrier, is a waveform (usually sinusoid' +
        'al) that is modulated (modified) with an input signal for the purpose of conveyi' +
        'ng information.'
  },
  block3: {
    data: [],
    linked: false,
    links: [],
    name: 'BPSK',
    neededLinks: 2,
    paused: false,
    position: {
      x: 200,
      y: 120
    },
    priority: 2,
    requiredLinks: [
      'Data', 'Carrier Wave'
    ],
    type: 'bpsk',
    updated: false,
    description: 'Binary Phase Shift Keying (BPSK) is a two phase modulation scheme, where the 0’s' +
        ' and 1’s in a binary message are represented by two different phase states in th' +
        'e carrier signal: θ=0° for binary 1 and θ=180° for binary 0.'
  },
  block4: {
    data: [],
    linked: false,
    links: [],
    name: 'AWGN',
    neededLinks: 1,
    paused: false,
    position: {
      x: 400,
      y: 0
    },
    priority: 3,
    requiredLinks: ['Data'],
    type: 'awgn',
    updated: false,
    description: 'Additive white Gaussian noise (AWGN) is a basic noise model used in Information ' +
        'theory to mimic the effect of many random processes that occur in nature.'
  },
  block5: {
    data: [],
    linked: false,
    links: [],
    name: 'FSK',
    neededLinks: 2,
    paused: false,
    position: {
      x: 200,
      y: 120
    },
    priority: 2,
    requiredLinks: [
      'Data', 'Carrier Wave'
    ],
    type: 'fsk',
    updated: false,
    description: 'In Frequency Shify Keying (FSK) the frequency of the Carrier Wave is varied in a' +
        'ccordance with baseband digital input. Binary 1 and 0 is represented by two diff' +
        'erent carrier frequencies.'
  }
}
