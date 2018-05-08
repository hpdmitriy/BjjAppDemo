import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { isNil, find, pick } from 'lodash'
//import LessonsActions from '../../Redux/LessonsRedux'
import Label from '../../Components/Label'
import Voices from '../../Components/Voices'
import Rating from '../../Components/Rating'
import styles from './TrainingsListStyles'
import {
  trainingStatus
} from '../../Services/ApiHelpers'
import {lessonDifficultySelectorFactory, difficultyListSelector} from '../../selectors'

function TrainingsListItem (props) {
  const {onPressHandler, data, userId, difficultyList} = props
  let difficulty = 'not specified'
  if (!isNil(difficultyList)) {
    const getActiveDifficulty = find(difficultyList.rows, (difficulty) => difficulty.id === data.lesson.difficulty_id)
    difficulty = !isNil(getActiveDifficulty) ? getActiveDifficulty.name : 'not specified'
  }
  const training = trainingStatus(data.training_status, null, null)
  const borderStyle = StyleSheet.flatten(styles[`training_${training}_style`])
  return (
    <View style={styles.containerTrainingWrapper}>
      <TouchableWithoutFeedback
        onPress={() => onPressHandler('OneTrainingScreen', {id: data.id, title: data.lesson.title})}>
        <View elevation={4} style={[styles.containerTraining, {borderColor: borderStyle.borderColor}]}>
          <View style={styles.textRow}>
            <Text style={styles.title}>{ data.lesson.title }</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.owner}>
              { userId === data.student.id ?
                `Teacher: ${data.teacher.display_name} (${data.teacher.id})` :
                userId === data.teacher.id ?
                  `Student: ${data.student.display_name} (${data.student.id})` : null
              }
            </Text>
          </View>
          <View style={styles.trainingAttributes}>
            <Label
              text={difficulty}
              type='DIFFICULTY'
            />
            <Rating type='lessonRate' count={5} score={data.mark} />
            <Label
              text={training.replace('_', ' ')}
              type={training}
            />
            <Voices count={data.messages.length} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
TrainingsListItem.PropTypes = {
  onPress: PropTypes.func,
  data: PropTypes.object,
  lessonDifficulty: PropTypes.object
}
const mapStateToProps = () => {
  const lessonDifficulty = lessonDifficultySelectorFactory()
  return (state, props) => {
    return {
      lessonDifficulty: lessonDifficulty(state, props.data.lesson),
      difficultyList: difficultyListSelector(state)
    }
  }
}


export default connect(mapStateToProps, null)(TrainingsListItem)
