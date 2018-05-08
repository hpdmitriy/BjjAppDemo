import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux'
import { trainingsListSelector } from '../../selectors'
import { pointsCompletedTechniques } from './Stats'
import styles from './StatsStyles'

const graphIco = require('../../Images/Icons/graph.png') //55*55

function Stats (props) {
  const {trainingsList} = props
  const score = pointsCompletedTechniques(trainingsList)
  const well = score === 0 ? '0 need to improve your statistics' : `${score} that is 1.5% higher then the average user. Well done`
  return (
    <View style={styles.containerStatsAverage}>
      <View style={styles.statsAverageIco}>
        <Image
          style={[styles.statsGraphIco, {width: 55 / 2, height: 55 / 2}]}
          source={graphIco}
        />
      </View>
      <View style={styles.statsAverageText}>
        <Text style={styles.statsAverageInfo}>
          {`Your score is ${well}`}
        </Text>
      </View>
    </View>
  )
}
Stats.propTypes = {
  percent: PropTypes.number
}

const mapStateToProps = (state) => {
  return {
    trainingsList: trainingsListSelector(state),
  }
}

export default connect(mapStateToProps, null)(Stats)
