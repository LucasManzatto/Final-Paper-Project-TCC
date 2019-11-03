import _ from 'lodash'
import { connect } from 'react-redux'
import { pauseBlock } from '../actions'
import BlockCard from './BlockCard'
import Button from '@material-ui/core/Button'
import ExpandBlockCard from './ExpandedBlockCard'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

import * as selectors from '../selectors'
const style = {
  height: 200
}

const BottomArea = props => {
  // Se o total de links for diferente de 0 e o bloco não estiver linkado ele nao é renderizado
  let renderBlockCards = _.map(props.blocks, block => {
    if (!block.render) {
      return
    }
    return (
      <Grid priority={block.neededLinks} key={block.id} container item xs={12} sm={4} md={3}>
        {/* Button 1 */}
        <Grid xs={2} container item style={{display:'flex', alignItems: 'center', cursor:'pointer'}}>
          {block.paused ? 
            <PlayArrowIcon onClick={event => props.pauseBlock({ block})} /> : 
            <PauseIcon onClick={event => props.pauseBlock({ block})} />
          }
        </Grid>
        <Grid xs={8} container item >
          <Typography variant="subheading" align="center" style={{marginTop:5,width:'90%'}}>
            <b>{block.name}</b>
          </Typography>
        </Grid>
        {/* Button 2 */}
        <Grid xs={2} container item justify="center">
          <ExpandBlockCard block={block} />
        </Grid>
        {/* BlockCard */}
        <Grid style={{ height: 180 }} container item xs={12} spacing={16}>
          <Grid xs={12} item>
            <BlockCard block={block} key={block.id} />
          </Grid>
        </Grid>
      </Grid>
    )
  })
  return (
    <Paper elevation={0} square={true} style={style}>
      <Grid container>{renderBlockCards}</Grid>
    </Paper>
  )
}

const mapStateToProps = (state, props) => {
  return {
    blocks: selectors.projectBlocksSelector(state),
    //blocksSorted: selectors.getPrioritySelector(state)
  }
}

export default connect(
  mapStateToProps,
  { pauseBlock }
)(BottomArea)
