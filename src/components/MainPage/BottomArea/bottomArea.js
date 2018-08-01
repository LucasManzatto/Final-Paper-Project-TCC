import _ from "lodash";
import { connect } from "react-redux";
import { pauseBlock } from "../actions";
import BlockCard from "./BlockCard";
import Button from "@material-ui/core/Button";
import ExpandBlockCard from "./ExpandedBlockCard";
import Grid from "@material-ui/core/Grid";
import Paper from "material-ui/Paper";
import React from "react";

import * as selectors from "../selectors";
const style = {
  height: 200
};

const BottomArea = props => {
  let renderBlockCards = _.map(props.blocks, block => {
    //Se o total de links for diferente de 0 e o bloco não estiver linkado ele nao é renderizado
    if (block.links.length < block.neededLinks) {
      return;
    }
    return (
      <Grid priority={block.neededLinks} key={block.id} container item xs={3}>
        {/* Button 1 */}
        <Grid xs={6} container item>
          <Button
            variant="contained"
            color="primary"
            onClick={event => props.pauseBlock({ block })}
          >
            {block.paused ? <div>Resume</div> : <div>Pause</div>}
          </Button>
        </Grid>
        {/* Button 2 */}
        <Grid xs={6} container item justify="center">
          <ExpandBlockCard block={block} />
        </Grid>
        {/* BlockCard */}
        <Grid style={{ height: 180 }} container item xs={12} spacing={16}>
          <Grid xs={12} item>
            <BlockCard block={block} key={block.id} />
          </Grid>
        </Grid>
      </Grid>
    );
  });
  //renderBlockCards = _.orderBy(renderBlockCards, ["props"], ["asc"]);
  return (
    <Paper elevation={0} square={true} style={style}>
      <Grid container>{renderBlockCards}</Grid>
    </Paper>
  );
};

function compare(a, b) {
  if (a.last_nom < b.last_nom) return -1;
  if (a.last_nom > b.last_nom) return 1;
  return 0;
}

const mapStateToProps = state => {
  return {
    blocks: selectors.projectBlocksSelector(state),
    blocksSorted: selectors.getPrioritySelector(state)
  };
};

export default connect(
  mapStateToProps,
  { pauseBlock }
)(BottomArea);
