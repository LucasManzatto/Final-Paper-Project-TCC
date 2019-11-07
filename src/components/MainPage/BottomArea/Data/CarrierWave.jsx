import React from 'react'

import { createTimeArray, getScales } from '../../utils'
import useAnimation from '../../../../hooks/UseAnimation'
import { Graph } from '../Graph'


const createDataArray = (totalTime, frequency, amplitude) => {
  let time = createTimeArray(totalTime)
  const angularFrequency = 2 * Math.PI * frequency
  return time.map(currentTime => {
    let wt = angularFrequency * currentTime
    return amplitude * Math.sin(wt)
  })
}

const CarrierWave = ({ resolution, block, dimensions }) => {
  const { frequency, amplitude } = block

  const createDataArrayArgs = [resolution, frequency, amplitude]
  const updateOnChanges = [resolution, frequency, amplitude]
  const data = useAnimation(block, createDataArray, createDataArrayArgs, updateOnChanges)
  const scale = getScales(data, dimensions, block.name, resolution, amplitude)

  return <Graph scale={scale} data={data} />
}

export default CarrierWave