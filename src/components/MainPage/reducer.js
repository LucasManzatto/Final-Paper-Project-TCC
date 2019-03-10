/* eslint-disable no-unused-vars */
import * as consts from '../../constants';
import update from 'immutability-helper';

import { initialState } from '../../initialState';
import { createReducer } from 'redux-starter-kit';

import * as actions from './actions';
import _ from 'lodash';

const reducer = createReducer(initialState, {
	// ADICIONA BLOCO AO PROJETO
	[actions.addBlockToProject]: (state, action) => {
		const newBlock = _.clone(action.payload.block);
		newBlock['id'] = state.idCounter++;
		state.projects[state.currentProject].blocks.push(newBlock);
	},
	// ATUALIZA O BLOCO CLICADO
	[actions.blockClicked]: (state, action) => {
		state.clickedBlock = action.payload;
	},
	// ATUALIZA O ARRAY DE BLOCOS QUE VAO SER LINKADOS
	[actions.blocksToLink]: (state, action) => {
		state.blocksToLinkArray.push(action.payload.block);
		if (state.blocksToLinkArray.length === 2) {
			let blockToLink1 = state.blocksToLinkArray[0];
			let blockToLink2 = state.blocksToLinkArray[1];
			const arrayIndexBlock1 = state.projects[state.currentProject].blocks.findIndex(
				(prop) => prop.id == blockToLink1.id
			);
			let block = state.projects[state.currentProject].blocks[arrayIndexBlock1];
			block.links.push(blockToLink2.id);
			if (block.links.length >= block.neededLinks) {
				state.projects[state.currentProject].blocks[arrayIndexBlock1].linked = true;
				state.projects[state.currentProject].blocks[arrayIndexBlock1].render = true;
			}
			state.blocksToLinkArray = [];
		}
	},
	// DELETA O BLOCO DO PROJETO
	[actions.deleteBlock]: (state, action) => {
		let blocks = state.projects[state.currentProject].blocks;
		blocks = blocks.filter((block) => block.id !== action.payload.id);
	},
	// DELETA UM LINK DO BLOCO
	[actions.deleteLink]: (state, action) => {
		const newBlock = _.clone(action.payload.block);
		newBlock.links = newBlock.links.filter((link) => link !== action.payload.link);
		newBlock.linked = false;
		newBlock.data = [];
		newBlock.render = false;
		const arrayIndex = state.projects[state.currentProject].blocks.findIndex(
			(prop) => prop.id == action.payload.block.id
		);
		state.projects[state.currentProject].blocks[arrayIndex] = newBlock;
	},
	// MOVE O BLOCO NA TELA
	[actions.moveBlock]: (state, action) => {
		state.projects[state.currentProject].blocks[action.payload.indexOfBlock].position = action.payload.value;
	},
	// PAUSA O GRÁFICO DO BLOCO
	[actions.pauseBlock]: (state, action) => {
		const { block } = action.payload;
		const blockIndex = findBlockIndex(state.projects[state.currentProject].blocks, block);
		const blockToUpdate = state.projects[state.currentProject].blocks[blockIndex];
		blockToUpdate['paused'] = !blockToUpdate.paused;
	},
	// ATUALIZA O LINK ATUALMENTE SELECIONADO, PARA PODER DELETA-LO
	[actions.selectLink]: (state, action) => {
		state.selectedLink = action.payload;
	},
	// ATUALIZA UMA PROPRIEDADE DO BLOCO
	[actions.updateBlockValue]: (state, action) => {
		const { block, key, value } = action.payload;
		const projectBlocks = state.projects[state.currentProject].blocks;
		const blockIndex = findBlockIndex(state.projects[state.currentProject].blocks, block);
		let blockToUpdate = projectBlocks[blockIndex];
		blockToUpdate[key] = value;
	},
	// ATUALIZA O PROJETO,
	[actions.updateCurrentProject]: (state, action) => {
		state.currentProject = action.payload;
		state.clickedBlock = {};
	}
});

const findBlockIndex = (blocks, block) => blocks.findIndex((p) => p.id === block.id);

export const updateBlock = (state, block) => {};

export default reducer;
