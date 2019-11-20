import { createTimeArray } from '../src/components/MainPage/utils'
export const initialState = {
  userState: {
    user: 'Lucas',
    currentProject: 0,
    idCounter: 0,
    selectedLink: {
      id: 2,
      linkPosition: 0
    },
    amplitude: 3,
    blocksToLinkArray: [],
    clickedBlock: {},
    projects: {
      0: {
        id: 0,
        name: 'Project 1',
        totalBlocks: 0,
        blocks: []
      },
    },
  },
  isAuthenticated: true,
  blocks: [
    {
      binary: [1, 1, 1, -1, 1, -1],
      data: [],
      linked: false,
      links: [],
      name: 'Data',
      neededLinks: 0,
      paused: false,
      position: {
        x: 0,
        y: 0
      },
      priority: 1,
      requiredLinks: ['None'],
      type: 'square',
      updated: false,
      render: true,
      keysToShow: ['binary']
    },
    {
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
        y: 0
      },
      priority: 1,
      requiredLinks: ['None'],
      type: 'sine',
      updated: false,
      render: true,
      description:
        'A carrier wave, carrier signal, or just carrier, is a waveform (usually sinusoid' +
        'al) that is modulated (modified) with an input signal for the purpose of conveyi' +
        'ng information.',
      keysToShow: ['amplitude', 'frequency'],
    },
    {
      data: [],
      linked: false,
      links: [],
      name: 'BPSK',
      neededLinks: 2,
      paused: false,
      position: {
        x: 0,
        y: 0
      },
      priority: 2,
      requiredLinks: ['Data', 'Carrier Wave'],
      type: 'bpsk',
      updated: false,
      render: false,
      description:
        'Binary Phase Shift Keying (BPSK) is a two phase modulation scheme, where the 0’s' +
        ' and 1’s in a binary message are represented by two different phase states in th' +
        'e carrier signal: θ=0° for binary 1 and θ=180° for binary 0.',
      keysToShow: []
    },
    {
      data: [],
      linked: false,
      links: [],
      name: 'AWGN',
      neededLinks: 1,
      paused: false,
      position: {
        x: 0,
        y: 0
      },
      priority: 3,
      requiredLinks: ['Data'],
      type: 'awgn',
      updated: false,
      render: false,
      description:
        'Additive white Gaussian noise (AWGN) is a basic noise model used in Information ' +
        'theory to mimic the effect of many random processes that occur in nature.',
      keysToShow: []
    },
    {
      data: [],
      linked: false,
      links: [],
      name: 'FSK',
      neededLinks: 2,
      paused: false,
      position: {
        x: 0,
        y: 0
      },
      priority: 2,
      requiredLinks: ['Data', 'Carrier Wave'],
      type: 'fsk',
      updated: false,
      render: false,
      description:
        'In Frequency Shify Keying (FSK) the frequency of the Carrier Wave is varied in a' +
        'ccordance with baseband digital input. Binary 1 and 0 is represented by two diff' +
        'erent carrier frequencies.',
      keysToShow: []
    },
    {
      data: [],
      linked: false,
      links: [],
      name: 'ASK',
      neededLinks: 2,
      paused: false,
      position: {
        x: 0,
        y: 0
      },
      priority: 2,
      requiredLinks: ['Data', 'Carrier Wave'],
      type: 'ask',
      updated: false,
      render: false,
      description:
        'In an ASK system, the binary symbol 1 is represented by transmitting a fixed-amplitude carrier' +
        ' wave and fixed frequency for a bit duration of T seconds. If the signal value is 1 then the' +
        'carrier signal will be transmitted; otherwise, a signal value of 0 will be transmitted.',
      keysToShow: []
    }
  ]
};
