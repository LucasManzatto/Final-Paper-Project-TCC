import React from 'react'
import Dimensions from 'react-dimensions'

import BinaryData from './BinaryData'
import BPSKData from './BPSKData'
import FSKData from './FSKData'
import AWGNData from './AWGNData'
import ASKData from './ASKData'
import CarrierWaveData from './CarrierWaveData'

const BlockCard = props => {
  const { block } = props
  let data
  let width = props.containerWidth
  let height = 164
  const expandedHeight = 780
  if (props.expanded) {
    height = expandedHeight
  }
  if (block.name === 'Data') {
    data = <BinaryData dimensions={{ width, height }} resolution={1200} block={block} />
  }
  if (block.name === 'Carrier Wave') {
    data = <CarrierWaveData dimensions={{ width, height }} resolution={1200} block={block} />
  }
  if (block.linked) {
    if (block.name === 'BPSK') {
      data = <BPSKData dimensions={{ width, height }} resolution={1200} block={block} />
    }
    if (block.name === 'FSK') {
      data = <FSKData dimensions={{ width, height }} resolution={1200} block={block} />
    }
    if (block.name === 'ASK') {
      data = <ASKData dimensions={{ width, height }} resolution={1200} block={block} />
    }
    if (block.name === 'AWGN') {
      data = <AWGNData dimensions={{ width, height }} resolution={1200} block={block} />
    }
  }

  return (
    <svg height={height} width={width}>
      {data}
    </svg>
  )
}

export default Dimensions()(BlockCard)
