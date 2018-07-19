import React from 'react'
import { line, curveLinear} from 'd3-shape'
import _ from 'lodash'
//import simplify from 'simplify-js'

export const Line = props => {
  const { xScale, yScale, data } = props
  let new_data;
  // const createFullArray = array =>{
  //   let data=[];
  //   array.forEach((item,index)=>{
  //       data.push({
  //           x:index,
  //           y: item
  //       });
  //   })
  //   return data;
  // }
  // const fullArray = createFullArray(data);
  if (!data.length) {
    return null;
  }
  data.x.forEach(data =>{
      new_data.x = xScale(data);
  })
  data.y.forEach(data =>{
      new_data.y = yScale(data);
  })

  const lineFunction = line()
    .curve(curveLinear)
    .x(d => d.x)
    .y(d => d.y)

  //const path = lineFunction(simplify(data));
  const path = lineFunction(new_data);
  return (
    <path
      d={path}
      style={{ stroke: 'blue', strokeWidth: 3, fill: 'none' }}
    />
  )
}
