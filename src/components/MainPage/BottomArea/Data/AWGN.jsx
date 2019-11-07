import { useSelector } from "react-redux"
import React from "react"

import { getScales } from "../../utils"
import useAnimation from '../../../../hooks/UseAnimation'
import { Graph } from "../Graph"

import * as selectors from "../../selectors"
import { rnorm } from "randgen"

const createDataArray = data => data.map(item => item + rnorm())

const AWGNData = ({ block, resolution, dimensions }) => {
  const linkedBlock = useSelector(state => selectors.linkedBlocksSelector(state, { block }))[0]
  const amplitude = linkedBlock.amplitude || 1

  const createDataArrayArgs = [linkedBlock.data]
  const updateOnChanges = [linkedBlock.data]
  const data = useAnimation(block, createDataArray, createDataArrayArgs, updateOnChanges)
  const scale = getScales(data, dimensions, block, resolution, amplitude)

  return <Graph scale={scale} data={data} />
}

export default AWGNData
