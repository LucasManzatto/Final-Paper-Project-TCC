import {createSelector} from 'reselect'
import _ from 'lodash'

export const allBlocksSelector = state => {
  state.mainPage.blocks
}

export const clickedBlockSelector = state => {
  state.mainPage.present.clickedBlock
}

export const projectBlocksSelector = state => state.mainPage.present.projects[state.mainPage.present.currentProject].blocks

export const linkedBlocksSelector = createSelector((_, props) => props.block, projectBlocksSelector, (block, blocks) => {
  let linkBlocks = []
  return block
    .links
    .map(link => _.find(blocks, block => block.id === link))
})

export const getIndexOfBlockSelector = (state, props) => {
  return state
    .mainPage
    .present
    .projects[state.mainPage.present.currentProject]
    .blocks
    .indexOf(props.block)
};

export const getPrioritySelector = createSelector(projectBlocksSelector, blocks => {
  blocks.sort(dynamicSort('priority'))
})

function dynamicSort(property) {
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
