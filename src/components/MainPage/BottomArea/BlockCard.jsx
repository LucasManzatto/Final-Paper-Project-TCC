import React from 'react'
import Dimensions from 'react-dimensions'

import BinaryData from './Data/Binary'
import BPSKData from './Data/BPSK'
import FSKData from './Data/FSK'
import AWGNData from './Data/AWGN'
import ASKData from './Data/ASK'
import CarrierWaveData from './Data/CarrierWave'


class BlockCard extends React.Component {
  render() {
    const { block } = this.props
    let data
    let width = this.props.containerWidth
    let height = 164
    const expandedHeight = 780
    if (this.props.expanded) {
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
}

export default Dimensions()(BlockCard)
