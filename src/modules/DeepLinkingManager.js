// @flow

import type { EdgeCurrencyWallet } from 'edge-core-js'
import React from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { selectWallet } from '../actions/WalletActions.js'
import { SEND_CONFIRMATION } from '../constants/indexConstants.js'
import type { Dispatch } from './ReduxTypes.js'

type DeepLinkingManagerStateProps = {
  wallets: Array<EdgeCurrencyWallet>,
  addressDeepLinkData: Object | null,
  address: string,
  currencyCode: string,
  amount: string
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
    if (this.props.wallets) this.checkForWallet()
  }

  checkForWallet () {
    const { currencyCode, address, amount } = this.props

    for (let i = 0; i < this.props.wallets.length; ++i) {
      if (this.props.wallets[i].currencyInfo.currencyCode === currencyCode) {
        this.props.selectWallet(this.props.wallets[i].id, currencyCode)

        this.props.markAddressDeepLinkDone()

        const guiMakeSpendInfo = {
          spendTargets: [
            {
              publicAddress: address,
              nativeAmount: amount
            }
          ]
        }

        console.log('QWEQWE', this.props)

        // Route to scan and call scanUri or route to Send with info
        // Actions.sendConfirmation({} guiMakeSpendInfo })
        // Actions[SEND_CONFIRMATION]({ guiMakeSpendInfo })

        break
      }
    }
  }
}

const mapStateToProps = (state, ownProps): DeepLinkingManagerStateProps => {
  const wallets = state.ui.wallets.byId
  return {
    wallets: wallets,
    addressDeepLinkData: state.core.deepLinking.addressDeepLinkData,
    address: state.core.deepLinking.addressDeepLinkData,
    currencyCode: state.core.deepLinking.addressDeepLinkData.currencyCode,
    amount: state.core.deepLinking.addressDeepLinkData.amount
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
