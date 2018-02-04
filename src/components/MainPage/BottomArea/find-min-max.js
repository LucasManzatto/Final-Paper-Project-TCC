import _ from 'lodash';
export const findMinMax = data => {
  let minX = Number.MAX_SAFE_INTEGER,
      maxX = Number.MIN_SAFE_INTEGER,
      minY = Number.MAX_SAFE_INTEGER,
      maxY = Number.MIN_SAFE_INTEGER

    if(!_.isEmpty(data)){
        data.map(data=>{
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
    }

  return {minX,maxX,minY,maxY};
}
