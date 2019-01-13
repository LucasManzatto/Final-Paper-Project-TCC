import * as consts from '../../constants'
import update from 'immutability-helper'

import { initialState } from '../../initialState'

export default function reducer (state = initialState, action) {
  let currentProject = state.currentProject
  const updateBlock = block => {
    return update(state, {
      projects: {
        [currentProject]: {
          blocks: {
            $merge: block
          }
        }
      }
    })
  }

  switch (action.type) {
    default:
      return state

    // ADICIONA BLOCO AO PROJETO
    case consts.ADD_TO_PROJECT:
      return update(state, {
        idCounter: {
          $set: action.payload.idCounter + 1
        },
        projects: {
          [currentProject]: {
            blocks: {
              $push: [action.payload.block]
            }
          }
        }
      })
    // ATUALIZA O BLOCO CLICADO
    case consts.BLOCK_CLICKED:
      return update(state, {
        clickedBlock: {
          $set: action.payload
        }
      })
    // ATUALIZA O ARRAY DE BLOCOS QUE VAO SER LINKADOS
    case consts.BLOCKS_TO_LINK:
      return update(state, {
        blocksToLinkArray: {
          $set: action.payload.blocksToLinkArray
        }
      })
    // ATUALIZA OS DADOS DO BLOCO
    case consts.BLOCK_UPDATED:
      return updateBlock(action.payload.block)
    // CRIA OS LINKS DO ARRAY DE ACORDO COM OS BLOCKS TO LINK
    case consts.CREATE_LINK:
      const arrayIndex = state
        .projects[currentProject]
        .blocks
        .indexOf(action.payload.block)
      return update(state, {
        projects: {
          [currentProject]: {
            blocks: {
              [arrayIndex]: {
                links: {
                  $push: [action.payload.link]
                },
                linked: {
                  $set: action.payload.linked
                },
                render: {
                  $set: action.payload.render
                }
              }
            }
          }
        }
      })
    // DELETA O BLOCO DO PROJETO
    case consts.DELETE_BLOCK:
      return update(state, {
        clickedBlock: {},
        projects: {
          [currentProject]: {
            blocks: blocks => blocks.filter(block => block !== action.payload)
          }
        }
      })
    // DELETA UM LINK DO BLOCO
    case consts.DELETE_LINK:
      return updateBlock(action.payload.block)
    // PAUSA O GRÁFICO DO BLOCO
    // TALVEZ POSSA SER FEITO COM STATE?
    case consts.PAUSE_BLOCK:
      return updateBlock(action.payload.block)
    // ATUALIZA O LINK ATUALMENTE SELECIONADO, PARA PODER DELETA-LO
    case consts.SELECT_LINK:
      return update(state, {
        selectedLink: {
          $set: action.payload
        }
      })
    // ATUALIZA UMA PROPRIEDADE DO BLOCO
    case consts.SET_BLOCK_VALUE:
      return update(state, {
        projects: {
          [currentProject]: {
            blocks: {
              [action.payload.indexOfBlock]: {
                [action.payload.key]: {
                  $set: action.payload.value
                }
              }
            }
          }
        }
      })
    // ATUALIZA A POSIÇÃO ATUAL DO BLOCO NA TELA
    case consts.TRACK_LOCATION:
      return updateBlock(action.payload.block)
    // ATUALIZA AS PROPRIEDADES DO BLOCO
    case consts.UPDATE_BLOCK:
      return updateBlock(action.payload.block)
    // ATUALIZA O PROJETO
    case consts.UPDATE_CURRENT_PROJECT:
      return update(state, {
        currentProject: {
          $set: action.payload
        },
        clickedBlock: {
          $set: {}
        }
      })
  }
}
