import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableWithoutFeedback, Text } from 'react-native'
import styles from './Styles/VoicesStyles'

const voicesIco = require('../Images/Icons/voices.png')

export default function Voices (props) {
  const {count, onPress} = props
  return (
    <TouchableWithoutFeedback
      onPress={() => onPress()}
    >
      <View style={styles.trainingCommentsWrap}>
        <Image
          source={voicesIco}
          style={styles.trainingComments}
        />
        <Text style={styles.trainingCommentsCounter}>{count}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}
Voices.propTypes = {
  count: PropTypes.number,
  onPress: PropTypes.func
}
Voices.defaultProps = {
  count: 0,
  onPress: () => null
}
