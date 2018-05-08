import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Text, TouchableHighlight, View, ScrollView } from 'react-native'
import InputDropDown from '../Components/InputDropDown'
import InputText from '../Components/InputText'
import RoundButton from '../Components/RoundButton'
import styles from '../Components/Styles/ScoredStyles'
import I18n from 'react-native-i18n'
import { Metrics, Colors, Fonts } from '../Themes'

export default class Scored extends Component {
  static propTypes = {
    type: PropTypes.string,
    onPress: PropTypes.func,
    onCancelPress: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  handleScored = () => {
    debugger
    this.props.onCancelPress()
    const score = this.textInputScore.state.buttonText
    const comment = this.textInputComment.props.value
    this.props.onPress(score, comment)
    this.props.onCancelPress()
  }


  render () {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible
        onRequestClose={() => null}>
        <ScrollView
          style={styles.container}
          onLayout={this.onLayout}
          keyboardShouldPersistTaps='always'
          contentContainerStyle={styles.scrollContainerContentCenter}
        >
          <View style={[styles.scoreForm, {paddingVertical: Metrics.baseMargin}]}>
            <Text style={styles.scoreTitle}>{ I18n.t(`score${this.props.type}Title`) }</Text>
            <Text style={styles.scoreMessage}>{ I18n.t(`score${this.props.type}Message`) }</Text>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <Text style={styles.scoreInputSmallLabel}>{I18n.t('scoreYouScore')}</Text>
              <InputDropDown
                refer={(inputScore) => { this.textInputScore = inputScore }}
                opts={[1, 2, 3, 4, 5]}
                selectedIndex={2}
                selectedValue={'3'}
              />
              <View style={styles.buttonSet}/>
              <Text style={styles.scoreInputSmallLabel}>{I18n.t('scoreYouComment')}</Text>
              <InputText
                placeholder={I18n.t('name')}
                value={I18n.t('scoreDefaultComment')}
                multiline
                refer={(inputComment) => { this.textInputComment = inputComment }}
                submitEditing={() => null}
                maxHeight={120}
                autoGrow
                dopStyles={{paddingHorizontal: 20, marginTop: 10}}
              />
            </View>

            <View style={styles.buttonSet}>
              <RoundButton
                ref={(submitForm) => { this.submitButton = submitForm }}
                spaced
                dopStyles={{
                  marginTop: Metrics.baseMargin * 2,
                  marginBottom: 0,
                  paddingLeft: Metrics.baseMargin * 2,
                  paddingRight: Metrics.baseMargin * 2,
                  marginHorizontal: Metrics.baseMargin,
                  height: 35,
                  width: 70,
                  alignSelf: 'center'
                }}
                dopTextStyles={{
                  fontSize: Fonts.size.regular,
                  marginVertical: Metrics.baseMargin,
                }}
                onPress={this.handleScored}
                text={I18n.t('ok')}
              />
              <RoundButton
                ref={(cancelForm) => { this.cancelButton = cancelForm }}
                spaced
                dopStyles={{
                  marginTop: Metrics.baseMargin * 2,
                  marginBottom: 0,
                  paddingLeft: Metrics.baseMargin * 2,
                  paddingRight: Metrics.baseMargin * 2,
                  marginHorizontal: Metrics.baseMargin,
                  height: 35,
                  width: 150,
                  alignSelf: 'center'
                }}
                dopTextStyles={{
                  fontSize: Fonts.size.regular,
                  marginVertical: Metrics.baseMargin,
                }}
                onPress={this.props.onCancelPress}
                text={I18n.t('cancel')}
              />

            </View>
          </View>
        </ScrollView>

      </Modal>
    )
  }
}
{/*
 <View style={{flexDirection: 'row', justifyContent: 'center'}}>
 <RoundButton
 ref={(submitForm) => { this.submitButton = submitForm }}
 spaced
 dopStyles={{
 marginTop: Metrics.baseMargin * 2,
 marginBottom: 0,
 paddingLeft: Metrics.baseMargin * 2,
 paddingRight: Metrics.baseMargin * 2,
 marginHorizontal: Metrics.baseMargin,
 height: 35,
 width: 70,
 alignSelf: 'center'
 }} dopTextStyles={{
 fontSize: Fonts.size.regular,
 marginVertical: Metrics.baseMargin,
 }}
 onPress={this.handleScored}
 text={I18n.t('ok')}
 />
 <RoundButton
 dopStyles={{
 marginTop: Metrics.baseMargin * 2,
 marginBottom: 0,
 paddingLeft: Metrics.baseMargin * 2,
 paddingRight: Metrics.baseMargin * 2,
 marginHorizontal: Metrics.baseMargin,
 height: 35,
 width: 150,
 alignSelf: 'center'
 }}
 dopTextStyles={{
 fontSize: Fonts.size.regular,
 marginVertical: Metrics.baseMargin,
 }}
 onPress={this.handleCancel}
 text={I18n.t('cancel')}
 />
 }
 </View>
 */
}
