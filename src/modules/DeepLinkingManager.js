// @flow

import type { EdgeCurrencyWallet } from 'edge-core-js'
import React from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { selectWallet } from '../actions/WalletActions.js'
import { SEND_CONFIRMATION } from '../constants/indexConstants.js'
import type { Dispatch } from './ReduxTypes.js'

type DeepLinkingManagerStateProps = {
  wallets: Object,
  addressDeepLinkData: Object
}

type DeepLinkingManagerDispatchProps = {
  selectWallet: (walletId: string, currencyCode: string) => any,
  markAddressDeepLinkDone: () => any
}

type Props = DeepLinkingManagerStateProps & DeepLinkingManagerDispatchProps

type State = {
  deepLinkTriggered: boolean
}

class DeepLinkingManager extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      deepLinkTriggered: false
    }
  }
  render () {
    return null
  }

  componentDidUpdate () {
    if (Object.keys(this.props.wallets).length > 0) this.checkForWallet()
  }

  checkForWallet () {
    const { addressDeepLinkData } = this.props
    const { currencyCode, address, amount } = addressDeepLinkData

    if (currencyCode === undefined) {
      return
    }
    if (address === undefined) {
      return
    }

    for (const wallet in this.props.wallets) {
      if (this.props.wallets[wallet].currencyCode === currencyCode) {
        this.props.markAddressDeepLinkDone()

        this.props.selectWallet(this.props.wallets[wallet].id, currencyCode)

        const guiMakeSpendInfo = {
          spendTargets: [
            {
              publicAddress: address,
              nativeAmount: amount
            }
          ]
        }

        console.log('QWEQWE found the wallet')

        // Route to scan and call scanUri or route to Send with info
        // Actions.sendConfirmation({} guiMakeSpendInfo })
        // Actions[SEND_CONFIRMATION]({ guiMakeSpendInfo })

        break
      }
    }
  }
}

const mapStateToProps = (state): DeepLinkingManagerStateProps => {
  return {
    wallets: state.ui.wallets.byId,
    addressDeepLinkData: state.core.deepLinking.addressDeepLinkData
  }
}

const mapDispatchToProps = (dispatch: Dispatch): DeepLinkingManagerDispatchProps => {
  return {
    selectWallet: (walletId: string, currencyCode: string) => dispatch(selectWallet(walletId, currencyCode)),
    markAddressDeepLinkDone: () =>
      dispatch({
        type: 'ADDRESS_DEEP_LINK_COMPLETE'
      })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeepLinkingManager)
