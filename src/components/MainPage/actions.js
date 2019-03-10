import * as consts from '../../constants'
import u from 'updeep'
import _ from 'lodash'
import {createAction} from 'redux-starter-kit'



export const addBlockToProject = createAction('ADD_TO_PROJECT')

export const blockClicked = createAction('BLOCK_CLICKED')

export const blocksToLink = createAction('BLOCKS_TO_LINK')

export const moveBlock = createAction('MOVE_BLOCK')

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

export const pauseBlock = createAction('PAUSE_BLOCK')

export const selectLink = createAction('SELECT_LINK')

export const updateBlockValue = createAction('UPDATE_BLOCK_VALUE')

export const updateCurrentProject = createAction('UPDATE_CURRENT_PROJECT')

export const updateDropDown = payload => ({ type: consts.UPDATE_DROPDOWN, payload })
