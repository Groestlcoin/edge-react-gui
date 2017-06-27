import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, TouchableOpacity, Image, ScrollView, ListView, Text, TextInput, View, StyleSheet, TouchableHighlight, Animated } from 'react-native'
import T from '../../components/FormattedText'
import {
  SettingsItemWithRoute,
  SettingsItemWithModal,
  SettingsItemWithSwitch
} from './SettingsItems.ui'
import {PrimaryButton} from '../../components/Buttons'
import { connect } from 'react-redux'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { Actions } from 'react-native-router-flux'
import s from './style'
import { border } from '../../../../util/border'

import {
  setAutoLogoutTimeRequest,
  setDefaultFiatCurrencyRequest,
  setMerchantModeRequest
} from './action.js'

class SettingsOverview extends Component {
  constructor(props) {
    super(props)

    this.settings = [
      { key: 'changePassword', text: 'Change Password' },
      { key: 'changePin', text: 'Change PIN' },
      { key: 'passwordRecovery', text: 'Setup / Change Password Recovery' }
    ]

    this.securityRoute = [
      { key: 'setup2Factor', text: 'Setup 2 Factor' }
    ]

    this.options = {
      pinRelogin: { text: 'PIN Re-Login', key: 'pinRelogin' },
      useTouchID: { text: 'Use TouchID',  key: 'useTouchID' }
    }

    this.optionModals = [
      { key: 'autoLogoff', text: 'Auto log off after' }
    ]

    this.currencies = [
      { key: 'btcSettings', text: 'Bitcoin', routeFunction: Actions.btcSettings },
      { key: 'ethSettings', text: 'Ethereum', routeFunction: Actions.ethSettings }
    ]
  }

  _handleOnPressRouting = (route) => {
    console.log('in SettingsOverview.ui.js, route is: ', route)
    let goRoute = Actions[route]
    goRoute()
  }

  _onPressOpenLogoffTime = () => {
    console.log('opening auto log off modal')
  }

  _onPressOpenDefaultCurrency = () => {
    console.log('opening default currency modal?')
  }

  _onPressOpenChangeCategories = () => {
    console.log('open change categories thingy')
  }

  _onToggleOption = (property) => {
    console.log('toggling option: ', option)
  }

  _onToggleDebug = () => {
    console.log('debug button pressed')
  }

  render() {
    return (
      <ScrollView style={s.container}>
        <LinearGradient style={[s.unlockRow]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#3B7ADA', '#2B5698']}>
          <View style={[s.accountBoxHeaderTextWrap, border('yellow')]}>
            <View style={s.leftArea}>
              <FAIcon style={[s.userIcon, border('green')]}
                name='user-o' color='white' />
              <T style={s.accountBoxHeaderText}>
                Account: Airbitz Super Dooper Wallet
              </T>
            </View>
          </View>
        </LinearGradient>

        <View>
          {this.settings.map(this.renderSettingsItemWithRoute)}
        </View>

        <LinearGradient style={[s.unlockRow]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#3B7ADA', '#2B5698']}>
          <View style={[s.accountBoxHeaderTextWrap, border('yellow')]}>
            <View style={s.leftArea}>
              <IonIcon name='ios-options' style={[s.userIcon, border('green')]} color='white' />
              <T style={s.accountBoxHeaderText}>Options</T>
            </View>
          </View>
        </LinearGradient>

        <View>
          {this.optionModals.map(this.renderSettingsItemWithModal)}
          {this.securityRoute.map(this.renderSettingsItemWithRoute)}
          {Object.keys(this.options).map(this.renderSettingsItemWithSwitch)}
          {this.currencies.map(this.renderSettingsItemWithRoute)}
          <View style={[s.debugArea, border('green')]}>
            <PrimaryButton text='Debug' onPressFunction={this._onToggleDebug} />
          </View>
          <View style={s.emptyBottom}></View>
        </View>
      </ScrollView>
    )
  }

  renderSettingsItemWithRoute = (x, i) => {
    return <SettingsItemWithRoute leftText={x.text} key={i} scene={x.key} routeFunction={x.routeFunction} />
  }

  renderSettingsItemWithSwitch = (x, i) => {
    return (
      <SettingsItemWithSwitch leftText={this.options[x].text}
        key={this.options[x].key} property={this.options[x].key} />
    )
  }

  renderSettingsItemWithModal = (x,i) => {
    return <SettingsItemWithModal leftText={x.text} key={x.key} modal={x.key} />
  }
}

const mapStateToProps = state => ({
  settingsFile: state.core.account.folder.file('settings.json')
})
const mapDispatchToProps = dispatch => ({
  setAutoLogoutTime: autoLogoffTimeInSeconds => { dispatch(setAutoLogoutTimeRequest(autoLogoffTimeInSeconds)) },
  setDefaultFiatCurrency: defaultFiatCurrency => { dispatch(setDefaultFiatCurrencyRequest(defaultFiatCurrency)) },
  setMerchantMode: merchantMode => { dispatch(setMerchantModeRequest(merchantMode)) }
})

export default SettingsOverviewConnect = connect(mapStateToProps, mapDispatchToProps)(SettingsOverview)