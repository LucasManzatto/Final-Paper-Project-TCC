import * as consts from "../../constants";
import update from "immutability-helper";

import { initialState } from "../../initialState";

export default function reducer(state = initialState, action) {
  let block,
    currentProject = state.currentProject;
  const updateBlock = block => {
    return update(state, {
      projects: {
        [currentProject]: {
          blocks: { $merge: block }
        }
      }
    });
  };

  switch (action.type) {
    default:
      return state;
    case consts.ADD_TO_PROJECT:
      return update(state, {
        idCounter: { $set: action.payload.idCounter + 1 },
        projects: {
          [currentProject]: {
            blocks: { $push: [action.payload.block] }
          }
        }
      });
    case consts.BLOCK_CLICKED:
      return update(state, { clickedBlock: { $set: action.payload } });
    case consts.BLOCKS_TO_LINK:
      return update(state, { blocksToLinkArray: { $set: action.payload.blocksToLinkArray } });
    case consts.BLOCK_UPDATED:
      return updateBlock(action.payload.block);
    case consts.CREATE_LINK:
      const arrayIndex = state.projects[currentProject].blocks.indexOf(action.payload.block);
      return update(state, {
        projects: {
          [currentProject]: {
            blocks: {
              [arrayIndex]: {
                links: { $push: [action.payload.link] },
                linked: { $set: action.payload.linked }
              }
            }
          }
        }
      });
    case consts.DELETE_BLOCK:
      return update(state, {
        clickedBlock: {},
        projects: {
          [currentProject]: {
            blocks: blocks => blocks.filter(block => block !== action.payload)
          }
        }
      });
    case consts.DELETE_LINK:
      return updateBlock(action.payload.block);
    case consts.PAUSE_BLOCK:
      return updateBlock(action.payload.block);
    case consts.SELECT_LINK:
      return update(state, {
        selectedLink: { $set: action.payload }
      });
    case consts.SET_BLOCK_VALUE:
      return update(state, {
        projects: {
          [currentProject]: {
            blocks: {
              [action.payload.indexOfBlock]: {
                [action.payload.key]: { $set: action.payload.value }
              }
            }
          }
        }
      });
    case consts.TRACK_LOCATION:
      return updateBlock(action.payload.block);
    case consts.UPDATE_BLOCK:
      return updateBlock(action.payload.block);
    case consts.UPDATE_CURRENT_PROJECT:
      return update(state, {
        currentProject: { $set: action.payload },
        clickedBlock: { $set: {} }
      });
  }
}
