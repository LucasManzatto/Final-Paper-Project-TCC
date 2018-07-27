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
    // case consts.LOGIN:
    //     return initialStateLogged;
    case consts.ADD_TO_PROJECT:
      return update(state, {
        projects: {
          [currentProject]: {
            blocks: { $push: [action.payload] }
          }
        }
      });
    case consts.UPDATE_BLOCK:
      return updateBlock(action.payload.block);
    case consts.BLOCK_UPDATED:
      return updateBlock(action.payload.block);
    case consts.TRACK_LOCATION:
      return updateBlock(action.payload.block);
    case consts.PAUSE_BLOCK:
      return updateBlock(action.payload.block);
    case consts.UPDATE_CURRENT_PROJECT:
      return update(state, {
        currentProject: { $set: action.payload },
        clickedBlock: { $set: {} }
      });

    case consts.BLOCK_CLICKED:
      return update(state, { clickedBlock: { $set: action.payload } });
    case consts.BLOCKS_TO_LINK:
      return update(state, { blocksToLinkArray: { $set: action.payload.blocksToLink } });
    case consts.SELECT_LINK:
      return update(state, {
        selectedLink: { $set: action.payload }
      });
    case consts.CREATE_LINK:
      return updateBlock(action.payload.block);
    case consts.DELETE_LINK:
      block = state.projects[currentProject].blocks[state.selectedLink.id];
      const linkPosition = state.selectedLink.linkPosition;
      let linked = block.linked;
      //O block deve ter linked=false quando o numero de links for menor que o numero de links necessarios
      //Se o total de links menos 1 for igual a 0, quer dizer que o bloco não está mais linkado
      if (block.links.length - 1 < block.neededLinks) {
        linked = false;
      }
      return update(state, {
        projects: {
          [currentProject]: {
            blocks: {
              [block.id]: {
                links: arr => arr.filter(item => item !== linkPosition),
                linked: { $set: linked }
              }
            }
          }
        }
      });
  }
}
