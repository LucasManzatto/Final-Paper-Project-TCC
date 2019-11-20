import React from 'react'
import Dimensions from 'react-dimensions'

import Binary from './Data/Binary'
import BPSK from './Data/BPSK'
import FSK from './Data/FSK'
import AWGN from './Data/AWGN'
import ASK from './Data/ASK'
import CarrierWave from './Data/CarrierWave'


class BlockCard extends React.Component {
  render() {
    const { block, containerWidth: width, expanded } = this.props
    const expandedHeight = window.innerHeight - 90
    const height = expanded ? expandedHeight : 164

    let data
    if (block.name === 'Data') {
      data = <Binary dimensions={{ width, height }} resolution={1200} block={block} />
    }
    if (block.name === 'Carrier Wave') {
      data = <CarrierWave dimensions={{ width, height }} resolution={1200} block={block} />
    }
    if (block.linked) {
      if (block.name === 'BPSK') {
        data = <BPSK dimensions={{ width, height }} resolution={1200} block={block} />
      }
      if (block.name === 'FSK') {
        data = <FSK dimensions={{ width, height }} resolution={1200} block={block} />
      }
      if (block.name === 'ASK') {
        data = <ASK dimensions={{ width, height }} resolution={1200} block={block} />
      }
      if (block.name === 'AWGN') {
        data = <AWGN dimensions={{ width, height }} resolution={1200} block={block} />
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
