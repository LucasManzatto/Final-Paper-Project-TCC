import * as consts from '../../constants'
import u from 'updeep'
import _ from 'lodash'

export const addBlockToProject = payload => {
  let newPayload = u({
    block: {
      id: payload.idCounter
    }
  }, payload)
  return { type: consts.ADD_TO_PROJECT, payload: newPayload }
}

export const blockClicked = payload => ({ type: consts.BLOCK_CLICKED, payload })

export const blockUpdated = payload => {
  payload.block.updated = payload.updated
  return { type: consts.BLOCK_UPDATED, payload }
}

export const blocksToLink = payload => {
  let newPayload = u({
    blocksToLinkArray: addLink(payload.blocksToLinkArray, payload.id, payload.type)
  }, payload)
  function addLink (blocksToLinkArray, link, type) {
    if (blocksToLinkArray.length >= 2) {
      return []
    } else {
      if (type === 'add') {
        return [].concat(blocksToLinkArray, [link])
      } else if (type === 'delete') {
        return _.remove(blocksToLinkArray, links => links === link)
      }
    }
  }
  // Only 2 blocks can be linked at the same time
  return { type: consts.BLOCKS_TO_LINK, payload: newPayload }
}

export const createLink = payload => {
  // after the link is created , this block needs to be deleted from the
  // blocksToLinkArray
  if (payload.block.links.length + 1 === payload.block.neededLinks) {
    payload.linked = true
    payload.render = true
  } else {
    payload.linked = false
  }
  return { type: consts.CREATE_LINK, payload }
}

export const deleteBlock = payload => ({ type: consts.DELETE_BLOCK, payload })

// Quando um link é deletado, é necessário sempre apagar a data porque quando um
// link é deletado o bloco num está com todos os links e não deve ter nenhuma
// data
export const deleteLink = payload => {
  payload.block.links = payload
    .block
    .links
    .filter(link => link !== payload.link)
  payload.block.linked = false
  payload.block.data = []
  payload.block.render = false
  return { type: consts.DELETE_LINK, payload: payload }
}

export const pauseBlock = payload => {
  payload.block.paused = !payload.block.paused
  return { type: consts.PAUSE_BLOCK, payload: payload }
}

export const selectLink = payload => ({ type: consts.SELECT_LINK, payload })

export const trackLocation = payload => {
  payload.block.position = payload.deltaPosition
  return { type: consts.TRACK_LOCATION, payload: payload }
}

export const updateBlockValue = payload => {
  let newPayload = payload
  if (payload.key === 'frequency' || payload.key === 'amplitude') {
    if (payload.value <= 0) {
      newPayload = u({
        value: 0
      }, payload)
    }
  }
  return { type: consts.SET_BLOCK_VALUE, payload: newPayload }
}

export const updateCurrentProject = payload => ({ type: consts.UPDATE_CURRENT_PROJECT, payload })

export const updateData = payload => ({ type: consts.UPDATE_DATA, payload })

export const updateDropDown = payload => ({ type: consts.UPDATE_DROPDOWN, payload })
