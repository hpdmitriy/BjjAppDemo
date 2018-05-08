import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import styles from './Styles/RatingStyles'

const firstIco = require('../Images/Icons/first.png')

function ratingBuild (score, count) {
  let rating = []
  for (let r = 1; r <= count; r++) {
    const tintColor = score >= r - 0.4 ? styles.scoreFire : styles.scoreGrey
    const rate = <Image key={r}
      style={[styles.statisticScoreIco, tintColor]}
      source={firstIco}
    />
    rating.push(rate)
  }
  return rating
}

export default function Rating (props) {
  const {score, type, onPress, count} = props;
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View style={styles[type]}>
        {ratingBuild(score, count)}
      </View>
    </TouchableWithoutFeedback>
  )
}
Rating.propTypes = {
  score: PropTypes.number,
  count: PropTypes.number,
  onPress: PropTypes.func,
  type: PropTypes.string
}
Rating.defaultProps = {
  onPress: () => null,
  score: 0,
  count: 5,
  type: 'lessonRate'
}
