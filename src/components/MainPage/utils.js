import _ from 'lodash';
//AWGN +rnorm();
import {rnorm} from 'randgen';

export const findMinMax = dataArray => {
  let minX = Number.MAX_SAFE_INTEGER,
      maxX = Number.MIN_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxY = Number.MIN_SAFE_INTEGER

    _.map(dataArray,data=>{
        if (data.x < minX) {
            minX = data.x;}
        else if (data.x > maxX) {
            maxX = data.x;
        }

        if (data.y < minY) {
            minY = data.y;}
        else if (data.y > maxY) {
            maxY = data.y;
        }
    })

  return {minX,maxX,minY,maxY};
}

export const createSineArray = (totalTime,frequency,amplitude) =>{
    let data=[];
    const angularFrequency =2*Math.PI*frequency;
    for(let i=0;i<totalTime;i++){
      let currentTime = (i / totalTime);
      let wt =  angularFrequency * currentTime;
      data[i] = amplitude * Math.sin(wt);
    }
    return data;
}

export const createBinaryArray = (binaryArray,totalTime) =>{
      const size = totalTime/binaryArray.length;
      let index=0;
      let binaryAux = [];
      binaryArray.forEach(item=>{
          for(let i =0 ; i<size; i++){
              binaryAux[index++] =item;
      }});
      return binaryAux;
  }
  export const createQPSKBinaryArray = (binaryArray,totalTime) =>{
        const size = totalTime/binaryArray.length;
        let index=0;
        let binaryAux = [];
        let item;
        for(item in binaryArray){
            if(!((parseInt(item) + 1) === binaryArray.length)){
                for(let i =0 ; i<size/2; i++){
                    binaryAux[index++] = binaryArray[item];
                    binaryAux[index++] = binaryArray[parseInt(item) + 1];
                }
            }
        }
        return binaryAux;
    }
    // export const createBpskArray=(binaryArray,totalTime,frequency,amplitude)=>{
    //         let data=[];
    //         const angularFrequency =2*Math.PI*frequency;
    //         for(let i=0;i<totalTime-400;i++){
    //             let currentTime = (i / totalTime);
    //             let wt =  angularFrequency * currentTime;
    //             if(binaryArray[i] === 0 && binaryArray[i+400] === 0){
    //                 data[i] = amplitude*Math.sin(wt + 45);
    //             }
    //             else if(binaryArray[i] === 0 && binaryArray[i+400] === 1){
    //
    //                 data[i] = amplitude*Math.sin(wt + 135);
    //             }
    //             if(binaryArray[i] === 1 && binaryArray[i+400] === 0){
    //                 data[i] =amplitude*Math.sin(wt - 45);
    //             }
    //             else if(binaryArray[i] === 1 && binaryArray[i+400] === 1){
    //                 data[i] = amplitude*Math.sin(wt - 135);
    //             }
    //         }
    //         return data;
    //   }

export const createBpskArray=(binaryArray,totalTime,frequency,amplitude)=>{
        let data=[];
        let dataSine = []
        const angularFrequency =2*Math.PI*frequency;
        for(let i=0;i<totalTime;i++){
            let currentTime = (i / totalTime);
            let wt =  angularFrequency * currentTime;
            if(binaryArray[i] === 0){
                data[i] = -amplitude*Math.cos(wt);
            }
            else{
                data[i] = amplitude*Math.cos(wt);
            }
        }
        return data;
  }

export const createAwgnArray=(linkedBlock) =>{
        let awgnArray = [];
        linkedBlock.forEach((item,index)=>{
            awgnArray[index] = item + rnorm();
        })
        return awgnArray;
  }

export const notHidden = key =>{
  if(key !== "id"
   && key !== "position"
   && key !== "type"
   && key !== "paused"
   && key !== "name"
   && key !== "carrierWave"
   && key !== "source"
   && key !== "absolutePosition"
   && key !== "linked"
   && key !== "samples"
   && key !== "bpsk"
   && key !== "links"
   && key !== "neededLinks"
    && key !== "updated"
  ){
      return true;
  }
  return false;
}
