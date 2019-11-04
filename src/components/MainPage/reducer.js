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
		state.projects[state.currentProject].blocks = _.sortBy(state.projects[state.currentProject].blocks, ['priority'])
	},
	// ATUALIZA O BLOCO CLICADO
	[actions.blockClicked]: (state, action) => {
		state.clickedBlock = action.payload;
	},
	// ATUALIZA O ARRAY DE BLOCOS QUE VAO SER LINKADOS
	[actions.blocksToLink]: (state, action) => {
		state.blocksToLinkArray.push(action.payload.block);
		// Se o usuário fez o link entre os 2 blocos(clicou na saída e na entrada), adiciona o link no objeto
		if (state.blocksToLinkArray.length === 2) {
			const blockToReceiveData = state.blocksToLinkArray[0];
			const blockToSendData = state.blocksToLinkArray[1];
			let block = _.find(state.projects[state.currentProject].blocks, { 'id': blockToReceiveData.id })
			block.links.push(blockToSendData.id);
			// Checa se o bloco tem links suficientes para mostrar os dados
			if (block.links.length >= block.neededLinks) {
				block.linked = true;
				block.render = true;
			}
			// Limpa os blocos que estão sendo linkados
			state.blocksToLinkArray = [];
		}
	},
	// DELETA O BLOCO DO PROJETO
	[actions.deleteBlock]: (state, action) => {
		const block = action.payload.block;
		const blockIndex = findBlockIndex(state.projects[state.currentProject].blocks, block);
		// Deleta os links e dados de todos os blocos que estão linkados com o bloco deletado 
		// Ex: Se um bloco AWGN está linkado a um bloco BPSK e o bloco BPSK é deletado, o link e os dados do AWGN
		// devem ser deletados
		state.projects[state.currentProject].blocks.map((bl) => {
			bl.links = bl.links.filter((link) => link !== block.id);
			if (bl.links.length < bl.neededLinks) {
				bl.linked = false;
				bl.data = [];
				bl.render = false;
			}
			return bl;
		});
		state.projects[state.currentProject].blocks.splice(blockIndex, 1);
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
		const blockId = action.payload.block.id;
		let block = _.find(state.projects[state.currentProject].blocks, { 'id': blockId })
		block['paused'] = !block.paused;
	},
	// ATUALIZA O LINK ATUALMENTE SELECIONADO, PARA PODER DELETA-LO
	[actions.selectLink]: (state, action) => {
		state.selectedLink = action.payload;
	},
	// ATUALIZA UMA PROPRIEDADE DO BLOCO
	[actions.updateBlockValue]: (state, action) => {
		const { block, key, value } = action.payload;
		const projectBlocks = state.projects[state.currentProject].blocks;
		let blockToUpdate = _.find(projectBlocks, { 'id': block.id })
		blockToUpdate[key] = value;
	},
	// ATUALIZA O PROJETO,
	[actions.updateCurrentProject]: (state, action) => {
		state.currentProject = action.payload;
		state.clickedBlock = {};
	}
});

const findBlockIndex = (blocks, block) => blocks.findIndex((p) => p.id === block.id);

export default reducer;
