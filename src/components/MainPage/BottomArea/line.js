import React from 'react'
import { line, curveLinear} from 'd3-shape'
//import simplify from 'simplify-js'

export const Line = props => {
  const { xScale, yScale, data } = props

  if (!data.length) {
    return null;
  }
  data.forEach(data =>{
      data.x = xScale(data.x);
      data.y = yScale(data.y);
  })

  const lineFunction = line()
    .curve(curveLinear)
    .x(d => d.x)
    .y(d => d.y)

  //onst path = lineFunction(simplify(data));
  const path = lineFunction(data);

  return (
    <path
      d={path}
      style={{ stroke: 'blue', strokeWidth: 3, fill: 'none' }}
    />
  )
}
