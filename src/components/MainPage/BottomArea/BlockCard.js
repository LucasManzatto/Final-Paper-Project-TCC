import React from 'react'
import Dimensions from 'react-dimensions'

import BinaryData from './BinaryData'
import BPSKData from './BPSKData'
import FSKData from './FSKData'
import AWGNData from './AWGNData'
import ASKData from './ASKData'
import CarrierWaveData from './CarrierWaveData'

const BlockCard = props => {
  const component = new React.Component(props)
  component.render = () => {
    const { block } = component.props
    let data
    let width = component.props.containerWidth
    let height = component.props.containerHeight
    const maxHeight = 870
    if (height > maxHeight) {
      height = maxHeight
    }
    if (block.name === 'Data') {
      data = <BinaryData dimensions={{ width, height }} resolution={1200} block={block} />
    }
    if (block.name === 'Carrier Wave') {
      data = <CarrierWaveData dimensions={{ width, height }} resolution={1024} block={block} />
    }
    if (block.name === 'BPSK' && block.linked) {
      data = <BPSKData dimensions={{ width, height }} resolution={1200} block={block} />
    }
    if (block.name === 'FSK' && block.linked) {
      data = <FSKData dimensions={{ width, height }} resolution={1200} block={block} />
    }
    if (block.name === 'ASK' && block.linked) {
      data = <ASKData dimensions={{ width, height }} resolution={1200} block={block} />
    }
    if (block.name === 'AWGN' && block.linked) {
      data = <AWGNData dimensions={{ width, height }} resolution={1200} block={block} />
    }
    return (
      <svg height={height} width={width}>
        {data}
      </svg>
    )
  }
  return component
}

export default Dimensions()(BlockCard)
