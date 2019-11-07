import { useSelector } from "react-redux"
import React from "react"

import { getScales, findLink, blockTypes } from "../../utils"
import useAnimation from '../../../../hooks/UseAnimation'
import { Graph } from "../Graph"

const createDataArray = (binaryArray, carrierData, amplitude) => {
  return carrierData.map((value, index) => (binaryArray[index] === -1 ? value : value * (amplitude * 2)) || 0)
}

const ASKData = ({ block, resolution, dimensions }) => {
  const blocks = useSelector(state => state.mainPage.present.projects[0].blocks)
  const binaryData = findLink(blockTypes.DATA, blocks, block.links).data
  const { amplitude: carrierAmplitude, data: carrierData } = findLink(blockTypes.CARRIER_WAVE, blocks, block.links)

  const createDataArrayArgs = [binaryData, carrierData, carrierAmplitude]
  const updateOnChanges = [binaryData, carrierData]
  const data = useAnimation(block, createDataArray, createDataArrayArgs, updateOnChanges)

  const scale = getScales(data, dimensions, block, resolution, carrierAmplitude)

  return <Graph scale={scale} data={data} />
}

export default ASKData
