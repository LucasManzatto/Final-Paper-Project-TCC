export const initialState ={
    currentProject : 0,
    clickedBlock : {
    },
    projects : {
        0 : {
            id: 0,
            name: "Project 1",
            blocks: {
                0: {
                    id:0,
                    name: 'RNG',
                    type: 'square',
                    samples :120,
                    position : {x:200 , y: 480},
                    paused : false,
                    linked: false,
                    binary : [1,0,1,0,1,0]
                },
                1:{
                    id:1,
                    name: 'Carrier Wave',
                    frequency: 8,
                    amplitude: 4,
                    type:'sine',
                    position : {x:0 , y: 300},
                    paused : false,
                    linked: false
                },
                2: {
                    id:2,
                    name: 'BPSK',
                    carrierWave : 1,
                    source :0,
                    type : 'bpsk',
                    position : {x:200, y: 120},
                    paused : false,
                    linked: true
                },
                3:{
                    id:3,
                    name: 'AWGN',
                    type: 'awgn',
                    position : {x:400 , y: 0},
                    paused : false,
                    linked: false
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
            name: 'RNG',
            type: 'square',
            samples :120,
            position : {x:200 , y: 480},
            paused : false,
            binary : [0,1,0]
        },
        1:{
            id:1,
            name: 'Carrier Wave',
            frequency: 4,
            amplitude: 4,
            type:'sine',
            position : {x:0 , y: 300},
            paused : false
        },
        2: {
            id:2,
            name: 'BPSK',
            carrierWave : 1,
            source :0,
            type : 'bpsk',
            position : {x:200, y: 120},
            paused : false
        },
        3:{
            id:3,
            name: 'AWGN',
            type: 'awgn',
            position : {x:400 , y: 0},
            paused : false
        },
        blocksIds : [0,1,2,3]
    }
}
export const initialStateLogged ={
    currentProject : 0,
    clickedBlock : {
    },
    projects : {
        0 : {
            id: 0,
            name: "Project 1",
            blocks: {
                0: {
                    id:0,
                    name: 'RNG',
                    type: 'square',
                    samples :120,
                    position : {x:200 , y: 480},
                    paused : false,
                    linked: false,
                    binary : [1,0,1,0,1,0]
                },
                1:{
                    id:1,
                    name: 'Carrier Wave',
                    frequency: 8,
                    amplitude: 4,
                    type:'sine',
                    position : {x:0 , y: 300},
                    paused : false,
                    linked: false
                },
                2: {
                    id:2,
                    name: 'BPSK',
                    carrierWave : 1,
                    source :0,
                    type : 'bpsk',
                    position : {x:200, y: 120},
                    paused : false,
                    linked: true
                },
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
            name: 'RNG',
            type: 'square',
            samples :120,
            position : {x:200 , y: 480},
            paused : false,
            binary : [0,1,0]
        },
        1:{
            id:1,
            name: 'Carrier Wave',
            frequency: 4,
            amplitude: 4,
            type:'sine',
            position : {x:0 , y: 300},
            paused : false
        },
        2: {
            id:2,
            name: 'BPSK',
            carrierWave : 1,
            source :0,
            type : 'bpsk',
            position : {x:200, y: 120},
            paused : false
        },
        blocksIds : [0,1,2]
    }
}
