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
      let xAxis =  angularFrequency * currentTime;
      data[i] = amplitude * Math.sin(xAxis);
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

export const createBpskArray=(binaryArray,totalTime,frequency,amplitude)=>{
        let data=[];
        const angularFrequency =2*Math.PI*frequency;
        for(let i=0;i<totalTime;i++){
            let currentTime = (i / totalTime);
            let xAxis =  angularFrequency * currentTime;
            if(binaryArray[i] === 0){
                data[i] = -amplitude*Math.cos(xAxis);
            }
            else{
                data[i] = amplitude*Math.cos(xAxis);
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
