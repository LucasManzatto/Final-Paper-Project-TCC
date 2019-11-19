import { useSelector } from "react-redux"
import React from "react"

import { getScales, findLink, blockTypes, createTimeArray } from "../../utils"
import useAnimation from '../../../../hooks/UseAnimation'
import { Graph } from "../Graph"
import * as selectors from '../../selectors'

const createDataArray = (binaryArray, carrierData, amplitude, frequency, totalTime) => {
  const time = createTimeArray(totalTime)
  return carrierData.map((data, index) => {
    if (binaryArray[index] === 1) {
      return data
    }
    else {
      const angularFrequency = 2 * Math.PI * (frequency * 2)
      const wt = angularFrequency * time[index]
      return amplitude * Math.sin(wt)
    }
  })
}
const FSK = ({ block, resolution, dimensions }) => {
  const blocks = useSelector(state => selectors.currentProjectBlocks(state))
  const binaryData = findLink(blockTypes.DATA, blocks, block.links).data
  const { amplitude: carrierAmplitude, data: carrierData, frequency: carrierFrequency } = findLink(blockTypes.CARRIER_WAVE, blocks, block.links)
  
  const createDataArrayArgs = [binaryData, carrierData, carrierAmplitude, carrierFrequency, resolution]
  const updateOnChanges = [binaryData, carrierData]
  const data = useAnimation(block, createDataArray, createDataArrayArgs, updateOnChanges)

  const scale = getScales(data, dimensions, block, resolution, carrierAmplitude)

  return <Graph scale={scale} data={data} />
}

export default FSK

