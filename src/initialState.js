import orm from './components/MainPage/models';
export const bootstrapState= () => {
    const initialState = orm.getEmptyState();
    const session = orm.mutableSession(initialState);
    const {Block,Project,UI} = session;

    const projeto = Project.create({
        name: "Project 1"
    })
    const projeto2 = Project.create({
        name: "Project 2"
    })

    const squareWave = Block.create({
        name: 'RNG',
        type: 'square',
        samples: 1000,
        position : {x:200 , y: 480},
        paused : false
    });
    const ui = UI.create({
        clickedBlock :squareWave,
        currentProject : 0,
    })

    const carrierWave = Block.create({
        name: 'Carrier Wave',
        frequency: 4,
        amplitude: 4,
        type:'sine',
        position : {x:0 , y: 300},
        paused : false
    });
    const Bpsk = Block.create({
        name: 'BPSK',
        data : 0,
        carrierWave : 1,
        frequency: 4,
        amplitude: 4,
        type : 'bpsk',
        position : {x:200, y: 120},
        paused : false
    });
    const awgn = Block.create({
        name: 'AWGN',
        type: 'awgn',
        position : {x:400 , y: 0},
        paused : false
    });

    projeto.blocks.add(squareWave);
    projeto.blocks.add(carrierWave);
    projeto.blocks.add(Bpsk);
    projeto.blocks.add(awgn);

    projeto2.blocks.add(awgn);
    return initialState;
}
