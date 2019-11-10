import React from 'react'

import { getScales } from '../../utils'
import useAnimation from '../../../../hooks/UseAnimation'
import { Graph } from '../Graph'

const createDataArray = (totalTime, binaryArray) => {
  const size = totalTime / binaryArray.length
  let binaryData = []

  binaryArray.forEach(item => {
    binaryData = binaryData.concat(Array(size).fill(item))
  })
  return binaryData
}

const Binary = ({ resolution, block, dimensions }) => {
  const { binary } = block

  const createDataArrayArgs = [resolution, binary]
  const updateOnChanges = [resolution, binary]
  const data = useAnimation(block, createDataArray, createDataArrayArgs, updateOnChanges)
  const scale = getScales(data, dimensions, block.name, resolution)

  return <Graph scale={scale} data={data} />
}

export default Binary