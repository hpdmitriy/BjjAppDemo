import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Text, Image } from 'react-native'
import { filter } from 'lodash'
import { trainingsListSelector, lessonsByUserSelector } from '../../selectors'
import styles from './StatsStyles'

const watchIco = require('../../Images/Icons/watch.png') //45*26
const firstIco = require('../../Images/Icons/first.png') //33*36
const starStrokeIco = require('../../Images/Icons/starstroke.png') //42*41
const starIco = require('../../Images/Icons/star.png') //26*25
const voicesIco = require('../../Images/Icons/voices.png') //33*34
const playIco = require('../../Images/Icons/play_stroke.png') //41*41

function numberViewedVideos (trainingsList) {
  return trainingsList === null ? +0 : trainingsList.length
}

function numberMasteredTechniques (trainingsList) {
  if (trainingsList === null || !trainingsList.length) {
    return 0
  }
  return filter(trainingsList, (o) => ['completed', 'marked'].indexOf(o.training_status) >= 0).length
}

export function pointsCompletedTechniques (trainingsList) {
  if (trainingsList === null || !trainingsList.length) {
    return 0
  }
  const points = trainingsList.filter((o) => ['completed', 'marked'].indexOf(o.training_status) >= 0)
  return points.reduce((sum, point) => sum + point.mark, 0)
}
function calculateTotalComments (trainingsList, uid) {
  let count = 0
  if (trainingsList === null || !trainingsList.length) return count
  for (let i = 0; i < trainingsList.length; i++) {
    const training = trainingsList[i]
    if (training.messages === null) continue
    count = training.messages.reduce((sum, msg) => { return msg.from_user_id === uid ? sum + 1 : sum + 0 }, count)
  }
  return count
}
function calculateTotalScores (trainingsList) {
  let scores = 0
  if (trainingsList === null || !trainingsList.length) return scores
  scores = trainingsList.reduce((sum, score) => { return score.mark === null ? sum + 0 : sum + score.mark }, scores)
  return scores
}

function Stats (props) {
  const {role, trainingsList, lessonsList, uid} = props
  if (role === 'Student') {
    return (
      <View style={styles.containerStats}>
        <View style={styles.statsData}>
          <Image
            style={[styles.statsIco, {width: 30 / 2, height: 17 / 2}]}
            source={ watchIco }
          />
          <Text style={styles.statsDataText}>
            {numberViewedVideos(trainingsList)}
          </Text>
        </View>
        <View style={styles.statsData}>
          <Image
            style={[styles.statsIco, {width: 25 / 2, height: 27 / 2}]}
            source={firstIco}
          />
          <Text
            style={styles.statsDataText}
          >
            {numberMasteredTechniques(trainingsList)}
          </Text>
        </View>
        <View style={styles.statsData}>
          <Image
            style={[styles.statsIco, {width: 25 / 2, height: 24 / 2}]}
            source={starStrokeIco}
          />
          <Text
            style={styles.statsDataText}
          >
            {pointsCompletedTechniques(trainingsList)}
          </Text>
        </View>
      </View>
    )
  } else if (role === 'Teacher') {
    return (<View style={styles.containerStats}>
      <View style={styles.statsData}>
        <Image
          style={[styles.statsIco, {width: 41 / 2.7, height: 41 / 2.7}]}
          source={playIco}
        />
        <Text style={styles.statsDataText}>
          {lessonsList !== null ? lessonsList.length : 0}
        </Text>
      </View>
      <View style={styles.statsData}>
        <Image
          style={[styles.statsIco, {width: 33 / 2.5, height: 34 / 2.5}]}
          source={voicesIco}
        />
        <Text style={styles.statsDataText}>
          {calculateTotalComments(trainingsList, uid)}
        </Text>
      </View>
      <View style={styles.statsData}>
        <Image
          style={[styles.statsIco, {width: 42 / 2.7, height: 41 / 2.7}]}
          source={starStrokeIco}
        />
        <Text
          style={styles.statsDataText}
        >
          {calculateTotalScores(trainingsList)}
        </Text>
      </View>
    </View>)
  } else {
    return null
  }

  // } else {
  //   return (
  //     <View style={styles.containerStats}>
  //       <View style={styles.statsData}>
  //         <Image
  //           style={[styles.statsIco, {width: 33 / 2.5, height: 34 / 2.5}]}
  //           source={ playIco }
  //         />
  //         <Text style={styles.statsDataText}>
  //           {stats.stat1}
  //         </Text>
  //       </View>
  //       <View style={styles.statsData}>
  //         <Image
  //           style={[styles.statsIco, {width: 33 / 2.5, height: 34 / 2.5}]}
  //           source={ voicesIco }
  //         />
  //         <Text
  //           style={styles.statsDataText}
  //         >
  //           {stats.stat2}
  //         </Text>
  //       </View>
  //       <View style={styles.statsData}>
  //         <Image
  //           style={[styles.statsIco, {width: 26 / 2.5, height: 25 / 2.5}]}
  //           source={ starIco }
  //         />
  //         <Text
  //           style={styles.statsDataText}
  //         >
  //           {stats.stat3}
  //         </Text>
  //       </View>
  //     </View>
  //   );
  // }
}
Stats.propTypes = {
  role: PropTypes.string,
  trainingsList: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
  lessonsList: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
}

const mapStateToProps = (state, props) => {
  return {
    trainingsList: trainingsListSelector(state),
    lessonsList: lessonsByUserSelector(state, props.uid)
  }
}

export default connect(mapStateToProps, null)(Stats)
