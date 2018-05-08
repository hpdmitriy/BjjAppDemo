import React from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import I18n from 'react-native-i18n'
import {isEmpty} from 'lodash'
import RoundButton from '../Components/RoundButton'
import styles from './Styles/RestrictContentStyles'

export default function RestrictContent (props) {
  if (isEmpty(props.tariff)) {
    return null
  } else {
    return (
      <View style={styles.content}>
        <Text style={styles.title}>
          {I18n.t('tariffNotAllow')}
        </Text>
        <Text style={styles.text}>
          {`${I18n.t('tariffNeedChange')}, for example: "${props.tariff.name}"`}
        </Text>
        <RoundButton
          spaced
          text={I18n.t('tariffChange')}
          navigate={props.navigate}
          navigator={props.navigator}
          dopStyles={{paddingLeft: 20, paddingRight: 20}}
        />
      </View>
    )
  }
}
RestrictContent.propTypes = {
  tariff: PropTypes.object
}
RestrictContent.defaultProps = {
  tariff: {}
}
