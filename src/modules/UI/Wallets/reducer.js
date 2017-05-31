import { combineReducers } from 'redux'
import * as WALLETS_ACTION from './action'
import * as WALLET_LIST_ACTION from '../scenes/WalletList/action'
import { FakeTxPrivate } from '../../../Fakes/FakeTxPrivate.js'

export const byId = (state = {}, action) => {
  switch (action.type) {
    case WALLETS_ACTION.ADD_WALLET :
      return {
        ...state,
        [action.data.wallet.id]: schema(action.data.wallet)
      }

    case WALLET_LIST_ACTION.UPDATE_WALLET_LIST_ORDER :
      return state

    case WALLET_LIST_ACTION.TOGGLE_ARCHIVE_WALLET :
      let key = action.data.key
      let stateChanged = {
        ...state,
        [key]: {
          ...state[key],
          archived: !state[key].archived
        }
      }
      return stateChanged

    case WALLET_LIST_ACTION.COMPLETE_RENAME_WALLET :
      return { ...state, [action.key]: { ...state[action.key], name: action.input } }

    case WALLETS_ACTION.COMPLETE_DELETE_WALLET :
      delete state[action.data]
      return state

    default:
      return state
  }
}

export const walletList = (state = [], action) => {
  switch (action.type) {
    case WALLETS_ACTION.UPDATE_WALLET_LIST :
      return action.data
    default:
      return state
  }
}

export const selectedWalletId = (state = '', action) => {
  switch (action.type) {
    case WALLETS_ACTION.SELECT_WALLET_BY_ID :
      return action.data.id
    default:
      return state
  }
}

export const walletListOrder = (state = [], action) => {
  switch (action.type) {
    case WALLET_LIST_ACTION.UPDATE_WALLET_LIST_ORDER :
      return action.data
    default:
      return state
  }
}

const schema = (wallet) => {
  const id = wallet.id
  const type = wallet.type
  const name = wallet.name

  const info = FakeTxPrivate.getInfo
  const {
    currencyCode,
    denominations,
    symbolImage,
    metaTokens } = info

  const newWallet = {
    id,
    type,
    name,
    currencyCode,
    denominations,
    symbolImage,
    metaTokens
  }

  return newWallet
}

export const walletsUI = combineReducers({
  byId: byId,
  walletList: walletList,
  walletListOrder: walletListOrder,
  selectedWalletId: selectedWalletId
})