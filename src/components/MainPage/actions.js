import * as consts from "../../constants";
import _ from "lodash";

const ID = () => {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

export const addBlockToProject = payload => {
  //payload.id = ID();
  return {
    type: consts.ADD_TO_PROJECT,
    payload
  };
};

export const blockClicked = payload => ({
  type: consts.BLOCK_CLICKED,
  payload
});

export const blockUpdated = payload => {
  payload.block.updated = payload.updated;
  return {
    type: consts.BLOCK_UPDATED,
    payload
  };
};

export const blocksToLink = payload => {
  //Only 2 blocks can be linked at the same time
  if (payload.blocksToLinkArray.length >= 2) {
    payload.blocksToLinkArray = [];
  }
  if (payload.type === "add") {
    payload.blocksToLinkArray.push(payload.id);
  } else if (payload.type === "delete") {
    _.remove(payload.blocksToLinkArray, link => link === payload.id);
  }
  return {
    type: consts.BLOCKS_TO_LINK,
    payload
  };
};

export const createLink = payload => {
  //after the link is created , this block needs to be deleted from the blocksToLinkArray
  payload.block.links.push(payload.link);
  if (payload.block.links.length === payload.block.neededLinks) {
    payload.block.linked = true;
  }
  return {
    type: consts.CREATE_LINK,
    payload
  };
};

export const deleteBlock = payload => {
  return {
    type: consts.DELETE_BLOCK,
    payload
  };
};

export const deleteLink = payload => {
  console.log(payload);
  payload.block.links = payload.block.links.filter(link => link !== payload.link);
  if (payload.block.links.length < payload.block.neededLinks) {
    payload.block.linked = false;
    payload.block.data = [];
  }
  return {
    type: consts.DELETE_LINK,
    payload
  };
};

export const pauseBlock = payload => {
  payload.block.paused = !payload.block.paused;
  return {
    type: consts.PAUSE_BLOCK,
    payload
  };
};

export const selectLink = payload => ({
  type: consts.SELECT_LINK,
  payload
});

export const trackLocation = payload => {
  payload.block.position = payload.deltaPosition;
  return {
    type: consts.TRACK_LOCATION,
    payload
  };
};

export const updateBlockValue = payload => {
  if (payload.key === "frequency" || payload.key === "amplitude") {
    if (payload.value > 0) {
      payload.block[payload.key] = payload.value;
    }
  } else {
    payload.block[payload.key] = payload.value;
  }
  return {
    type: consts.UPDATE_BLOCK,
    payload
  };
};

export const updateCurrentProject = payload => ({
  type: consts.UPDATE_CURRENT_PROJECT,
  payload
});

export const updateData = payload => ({
  type: consts.UPDATE_DATA,
  payload
});

export const updateDropDown = payload => ({
  type: consts.UPDATE_DROPDOWN,
  payload
});
