import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import styles from './Styles/LabelStyles'

export default function Label (props) {
  let bgColor = ''
  let textStyles = {}
  switch (props.type) {
    case 'BJJ EVENTS':
      bgColor = 'blueLabel'
      break
    case 'DIFFICULTY':
      bgColor = 'difficultyLabel'
      textStyles = 'difficultyLabelText'
      break
    case 'NOT_STARTED':
      bgColor = 'notStartedLabel'
      textStyles = 'notStartedLabelText'
      break
    case 'STARTED':
      bgColor = 'startedLabel'
      textStyles = 'startedLabelText'
      break
    case 'MARKED':
      bgColor = 'blueLabel'
      textStyles = 'blueLabelText'
      break
    default:
      bgColor = 'redLabel'
  }
  return (
    <View style={[styles.label, styles[bgColor]]}>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <View>
          <Text style={[styles.labelText, props.textStyle, styles[textStyles]]}>
            {props.text && props.text.toUpperCase()}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
Label.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  styles: PropTypes.object,
  textStyle: PropTypes.object,
  type: PropTypes.string
}
Label.defaultProps = {
  onPress: () => null
}
