import _ from "lodash";
import { connect } from "react-redux";
import { pauseBlock } from "../actions";
import BlockCard from "./BlockCard";
import Button from "@material-ui/core/Button";
import ExpandBlockCard from "./ExpandedBlockCard";
import Grid from "@material-ui/core/Grid";
import Paper from "material-ui/Paper";
import React from "react";
const style = {
  height: 200
};

const BottomArea = props => {
  const renderBlockCards = _.map(props.blocks, block => {
    //Se o total de links for diferente de 0 e o bloco não estiver linkado ele nao é renderizado
    if (block.links.length < block.neededLinks) {
      return;
    }
    return (
      <Grid key={block.id} container item xs={3}>
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

  return (
    <Paper elevation={0} square={true} style={style}>
      <Grid container>{renderBlockCards}</Grid>
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    blocks: state.mainPage.present.projects[state.mainPage.present.currentProject].blocks
  };
};

export default connect(
  mapStateToProps,
  { pauseBlock }
)(BottomArea);
