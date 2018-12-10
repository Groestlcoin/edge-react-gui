// @flow

import { type Reducer } from 'redux'

import { type Action } from '../../modules/ReduxTypes.js'

export type DeepLinkingState = {
  passwordRecoveryLink: string | null,
  addressDeepLinkData: Object | null
}

const initialState = {
  passwordRecoveryLink: null,
  addressDeepLinkData: {}
}

export const deepLinking: Reducer<DeepLinkingState, Action> = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'DEEP_LINK_RECEIVED': {
      return {
        ...state,
        passwordRecoveryLink: action.data
      }
    }

    case 'ADDRESS_DEEP_LINK_RECEIVED': {
      return {
        ...state,
        addressDeepLinkData: action.data
      }
    }

    case 'ADDRESS_DEEP_LINK_COMPLETE': {
      return {
        ...state,
        addressDeepLinkData: null
      }
    }

    case 'ACCOUNT_INIT_COMPLETE': {
      return {
        ...state,
        passwordRecoveryLink: null
      }
    }

    default:
      return state
  }
}
