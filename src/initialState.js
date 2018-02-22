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

    const binary = [0,1,0],samples =120;
    const data = createBinaryArray(binary,samples);
    const squareWave = Block.create({
        name: 'RNG',
        type: 'square',
        samples,
        position : {x:200 , y: 480},
        paused : false,
        data
    })
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

const createBinaryArray = (binaryArray,totalTime) =>{
    const size = totalTime/binaryArray.length;
    let index=0;
    let binaryAux = [];
    binaryArray.map(item=>{
        for(let i =0 ; i<size; i++){
            binaryAux[index++] = item;
    }});
    return binaryAux;
}
