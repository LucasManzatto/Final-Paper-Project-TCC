/* eslint-disable no-unused-vars */
import * as consts from '../../constants';
import update from 'immutability-helper';

import { initialState } from '../../initialState';
import { createReducer } from 'redux-starter-kit';

import * as actions from './actions';
import _ from 'lodash';

const reducer = createReducer(initialState, {
	[actions.setInitialState]: (state, action) => {
		if (!action.payload.clickedBlock) {
			action.payload['clickedBlock'] = {}
		}
		if (!action.payload.projects[0].blocks) {
			action.payload.projects[0] = {
				...action.payload.projects[0], blocks: []
			}
		}
		action.payload['blocksToLinkArray'] = []
		state.userState = action.payload
	},
	// ADICIONA BLOCO AO PROJETO
	[actions.addBlockToProject]: (state, action) => {
		const newBlock = _.clone(action.payload.block);
		newBlock['id'] = state.userState.idCounter++;
		state.userState.projects[state.userState.currentProject].blocks.push(newBlock);
		state.userState.projects[state.userState.currentProject].blocks = _.sortBy(state.userState.projects[state.userState.currentProject].blocks, ['priority'])
	},
	// ATUALIZA O BLOCO CLICADO
	[actions.blockClicked]: (state, action) => {
		state.userState.clickedBlock = action.payload;
	},
	// ATUALIZA O ARRAY DE BLOCOS QUE VAO SER LINKADOS
	[actions.blocksToLink]: (state, action) => {
		state.userState.blocksToLinkArray.push(action.payload.block);
		// Se o usuário fez o link entre os 2 blocos(clicou na saída e na entrada), adiciona o link no objeto
		if (state.userState.blocksToLinkArray.length === 2) {
			const blockToReceiveData = state.userState.blocksToLinkArray[0];
			const blockToSendData = state.userState.blocksToLinkArray[1];
			let block = _.find(state.userState.projects[state.userState.currentProject].blocks, { 'id': blockToReceiveData.id })
			block.links.push(blockToSendData.id);
			// Checa se o bloco tem links suficientes para mostrar os dados
			if (block.links.length >= block.neededLinks) {
				block.linked = true;
				block.render = true;
			}
			// Limpa os blocos que estão sendo linkados
			state.userState.blocksToLinkArray = [];
		}
	},
	// DELETA O BLOCO DO PROJETO
	[actions.deleteBlock]: (state, action) => {
		const blockId = action.payload;
		const blockIndex = findBlockIndex(state.userState.projects[state.userState.currentProject].blocks, blockId);
		// Deleta os links e dados de todos os blocos que estão linkados com o bloco deletado 
		// Ex: Se um bloco AWGN está linkado a um bloco BPSK e o bloco BPSK é deletado, o link e os dados do AWGN
		// devem ser deletados
		state.userState.projects[state.userState.currentProject].blocks.map((bl) => {
			bl.links = bl.links.filter((link) => link !== blockId);
			if (bl.links.length < bl.neededLinks) {
				bl.linked = false;
				bl.data = [];
				bl.render = false;
			}
			return bl;
		});
		state.userState.projects[state.userState.currentProject].blocks.splice(blockIndex, 1);
	},
	// DELETA UM LINK DO BLOCO
	[actions.deleteLink]: (state, action) => {
		const newBlock = _.clone(action.payload.block);
		newBlock.links = newBlock.links.filter((link) => link !== action.payload.link);
		newBlock.linked = false;
		newBlock.data = [];
		newBlock.render = false;
		const arrayIndex = state.userState.projects[state.userState.currentProject].blocks.findIndex(
			(prop) => prop.id === action.payload.block.id
		);
		state.userState.projects[state.userState.currentProject].blocks[arrayIndex] = newBlock;
	},
	// MOVE O BLOCO NA TELA
	[actions.moveBlock]: (state, action) => {
		const blockIndex = findBlockIndex(state.userState.projects[state.userState.currentProject].blocks, action.payload.blockId)
		state.userState.projects[state.userState.currentProject].blocks[blockIndex].position = action.payload.value;
	},
	// PAUSA O GRÁFICO DO BLOCO
	[actions.pauseBlock]: (state, action) => {
		const blockId = action.payload.id
		let block = _.find(state.userState.projects[state.userState.currentProject].blocks, { 'id': blockId })
		block['paused'] = !block.paused;
	},
	// ATUALIZA O LINK ATUALMENTE SELECIONADO, PARA PODER DELETA-LO
	[actions.selectLink]: (state, action) => {
		state.userState.selectedLink = action.payload;
	},
	// ATUALIZA UMA PROPRIEDADE DO BLOCO
	[actions.updateBlockValue]: (state, action) => {
		const { blockId, key, value } = action.payload;
		const projectBlocks = state.userState.projects[state.userState.currentProject].blocks;
		let blockToUpdate = _.find(projectBlocks, { 'id': blockId })
		blockToUpdate[key] = value;
	},
	[actions.updateBlockData]: (state, action) => {
		const { id, data } = action.payload;
		const projectBlocks = state.userState.projects[state.userState.currentProject].blocks;
		let blockToUpdate = _.find(projectBlocks, { 'id': id })
		blockToUpdate.data = data
	},
	// ATUALIZA O PROJETO,
	[actions.updateCurrentProject]: (state, action) => {
		state.userState.currentProject = action.payload;
		state.userState.clickedBlock = {};
	}
});

const findBlockIndex = (blocks, blockId) => blocks.findIndex((p) => p.id === blockId);

export default reducer;
