import { createSelector } from 'reselect'
import _ from 'lodash'

export const allBlocksSelector = state => state.mainPage.present.blocks

export const userState = state => state.mainPage.present.userState || null

export const currentProjectBlocks = state => {
  const userState = state.mainPage.present.userState
  return userState.projects[0].blocks
}

export const currentUser = state => userState(state).user

export const clickedBlockSelector = state => state.mainPage.present.userState ? state.mainPage.present.userState.clickedBlock : null

export const projectBlocksSelector = state => state.mainPage.present.userState.projects[state.mainPage.present.userState.currentProject].blocks

export const linkedBlocksSelector = createSelector((_, props) => props.block, projectBlocksSelector, (block, blocks) => {
  return block
    .links
    .map(link => _.find(blocks, block => block.id === link))
})

export const getIndexOfBlockSelector = (state, props) => {
  return state
    .mainPage
    .present
    .blocks
    .indexOf(props.block)
};

export const getPrioritySelector = createSelector(projectBlocksSelector, blocks => {
  blocks.sort(dynamicSort('priority'))
})

function dynamicSort (property) {
  var sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function (a, b) {
    var result = a[property] < b[property]
      ? -1
      : a[property] > b[property]
        ? 1
        : 0
    return result * sortOrder
  };
}
