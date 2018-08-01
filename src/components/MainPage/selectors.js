import { createSelector } from "reselect";

export const allBlocksSelector = state => {
  state.mainPage.blocks;
};

export const clickedBlockSelector = state => {
  state.mainPage.present.clickedBlock;
};

export const projectBlocksSelector = state =>
  state.mainPage.present.projects[state.mainPage.present.currentProject].blocks;

export const getIndexOfBlockSelector = (state, props) => {
  return state.mainPage.present.projects[state.mainPage.present.currentProject].blocks.indexOf(
    props.block
  );
};

export const getPrioritySelector = createSelector(projectBlocksSelector, blocks => {
  blocks.sort(dynamicSort("priority"));
});

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}
