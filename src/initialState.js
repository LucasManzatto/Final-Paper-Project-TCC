export const initialState ={
    currentProject : 0,
    selectedLink:{
        id: 2,
        linkPosition:0
    },
    amplitude: 3,
    clickedBlock : {
        id:1,
        name: 'Carrier Wave',
        frequency: 8,
        amplitude: 1,
        type:'sine',
        position : {x:0 , y: 300},
        paused : false,
        linked: false
    },
    projects : {
        0 : {
            id: 0,
            name: "Project 1",
            blocks: {
                0: {
                    id:0,
                    name: 'Binary Generator',
                    type: 'square',
                    samples :120,
                    position : {x:200 , y: 480},
                    paused : false,
                    linked: false,
                    updated: false,
                    binary : [1,0,1,0],
                    neededLinks : 0,
                    data: []
                },
                1:{
                    id:1,
                    name: 'Carrier Wave',
                    frequency: 8,
                    amplitude: 3,
                    type:'sine',
                    position : {x:0 , y: 400},
                    paused : false,
                    linked: false,
                    updated: false,
                    neededLinks : 0,
                    data: [],
                    description: 'In telecommunications, a carrier wave, carrier signal, or just carrier, is a waveform (usually sinusoidal) that is modulated (modified) with an input signal for the purpose of conveying information'
                },
                2: {
                    id:2,
                    name: 'BPSK',
                    links: [0,1],
                    type : 'bpsk',
                    position : {x:200, y: 120},
                    paused : false,
                    linked: true,
                    updated: false,
                    neededLinks : 2,
                    data: [],
                    description: 'Binary Phase Shift Keying (BPSK) is a two phase modulation scheme, where the 0’s and 1’s in a binary message are represented by two different phase states in the carrier signal: θ=0° for binary 1 and θ=180° for binary 0.'
                },
                3:{
                    id:3,
                    name: 'AWGN',
                    links:[2],
                    type: 'awgn',
                    position : {x:400 , y: 0},
                    paused : false,
                    linked: true,
                    updated: false,
                    neededLinks : 1,
                    data: [],
                    description : 'Additive white Gaussian noise (AWGN) is a basic noise model used in Information theory to mimic the effect of many random processes that occur in nature.'
                }
            }
        },
        1: {
            id:1,
            name: "Project 2",
            blocks : {
                1:{
                    id:1,
                    name: 'Carrier Wave',
                    frequency: 4,
                    amplitude: 4,
                    type:'sine',
                    position : {x:0 , y: 300},
                    paused : false
                },
            }
        }
    },
    blocks: {
        0: {
            id:0,
            name: 'Binary Generator',
            type: 'square',
            samples :120,
            position : {x:200 , y: 480},
            paused : false,
            linked: false,
            updated: false,
            binary : [1,0,1,0],
            neededLinks : 0
        },
        1:{
            id:1,
            name: 'Carrier Wave',
            frequency: 8,
            amplitude: 3,
            type:'sine',
            position : {x:0 , y: 400},
            paused : false,
            linked: false,
            updated: false,
            neededLinks : 0,
            description: 'In telecommunications, a carrier wave, carrier signal, or just carrier, is a waveform (usually sinusoidal) that is modulated (modified) with an input signal for the purpose of conveying information'
        },
        2: {
            id:2,
            name: 'BPSK',
            links: [0,1],
            type : 'bpsk',
            position : {x:200, y: 120},
            paused : false,
            linked: true,
            updated: false,
            neededLinks : 2,
            description: 'Binary Phase Shift Keying (BPSK) is a two phase modulation scheme, where the 0’s and 1’s in a binary message are represented by two different phase states in the carrier signal: θ=0° for binary 1 and θ=180° for binary 0.'
        },
        3:{
            id:3,
            name: 'AWGN',
            links:[2],
            type: 'awgn',
            position : {x:400 , y: 0},
            paused : false,
            linked: true,
            updated: false,
            neededLinks : 1,
            description : 'Additive white Gaussian noise (AWGN) is a basic noise model used in Information theory to mimic the effect of many random processes that occur in nature.'
        },
        blocksIds : [0,1,2,3]
    }
}
