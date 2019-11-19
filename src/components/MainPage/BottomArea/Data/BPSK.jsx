import { useSelector } from "react-redux"
import React from "react"

import { getScales, findLink, blockTypes } from "../../utils"
import useAnimation from '../../../../hooks/UseAnimation'
import { Graph } from "../Graph"
import * as selectors from '../../selectors'


const createDataArray = (binaryArray, carrierDataArray) => {
  return carrierDataArray.map((carrierData, position) => carrierData * binaryArray[position] || 0)
}

const BPSK = ({ block, resolution, dimensions }) => {
  const blocks = useSelector(state => selectors.currentProjectBlocks(state))
  const binaryData = findLink(blockTypes.DATA, blocks, block.links).data
  const { amplitude: carrierAmplitude, data: carrierData } = findLink(blockTypes.CARRIER_WAVE, blocks, block.links)

  const createDataArrayArgs = [binaryData, carrierData]
  const updateOnChanges = [binaryData, carrierData]
  const data = useAnimation(block, createDataArray, createDataArrayArgs, updateOnChanges)
  const scale = getScales(data, dimensions, block, resolution, carrierAmplitude)

  return <Graph scale={scale} data={data} />
}

export default BPSK
