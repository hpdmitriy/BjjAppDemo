import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { isNil, isUndefined, isNull, truncate } from 'lodash'
import LessonsActions from '../../Redux/LessonsRedux'
import Label from '../../Components/Label'
import BoockMarck from '../../Components/BoockMarck'
import Rating from '../../Components/Rating'
import styles from './LessonsListStyles'
import {
  addMainImg,
  calcLessonRating,
  trainingStatus,
  checkIsFavorites
} from '../../Services/ApiHelpers'

function LessonListItem (props) {
  const {onPressHandler, data, userId, userRole} = props
  let mainImg = data.preview_url
  if (isNull(mainImg)) {
    mainImg = !isUndefined(data.attachments) && data.attachments.length
      ? addMainImg(data.attachments) : addMainImg(null)
  }
  const difficulty = !isNil(data.difficulty) ? data.difficulty.name : 'not specified'
  const thisLessonScore = calcLessonRating(data.ratings, data.id)
  const training = trainingStatus(data.trainings, userId, data.id)
  const thisIsFavorites = checkIsFavorites(data.favorites, userId, data.id)
  return (

    <View style={styles.containerLesson}>
      <TouchableWithoutFeedback onPress={() => {
        return onPressHandler('OneLessonScreen', {id: data.id, title: data.category.name})
      }
      }>
        <Image source={{uri: mainImg}} style={styles.lessonImage}/>
      </TouchableWithoutFeedback>
      <LinearGradient
        colors={['rgba(255,255,255,0.8)', 'rgba(255,255,255,0.8)']}
        style={styles.containerGradient}
      >
        <TouchableWithoutFeedback onPress={() => {
          return onPressHandler('OneLessonScreen', {id: data.id, title: data.category.name})
        }
        }>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>
              {data.title}
            </Text>
            <Text style={styles.lessonDescription}>
              {truncate(data.description, {
                length: 170,
                separator: ' '
              })}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.lessonAttributes}>
          <Label
            text={difficulty}
            type='DIFFICULTY'
          />
          <Rating type='lessonRate' count={5} score={thisLessonScore}/>
          {
            userRole === 'Student' ? <Label
              text={training.replace('_', ' ')}
              type={training}
              onPress={() => console.log('ghghjghjghj')}
            /> : null
          }
          <BoockMarck onPress={() => props.lessonSetFavoriteFlagRequest(data.id, 'toggle', props.token)}
                      isFavorites={thisIsFavorites}/>
        </View>
      </LinearGradient>
    </View>
  )
}

LessonListItem.PropTypes = {
  onPress: PropTypes.func,
  data: PropTypes.object,
  token: PropTypes.string
}

const mapDispatchToProps = (dispatch) => {
  return {
    lessonGetByIdRequest: (id, token) => {
      dispatch(LessonsActions.lessonGetByIdRequest(id, token))
    },
    lessonSetFavoriteFlagRequest: (id, flag, token) => {
      dispatch(LessonsActions.lessonSetFavoriteFlagRequest(id, flag, token))
    }
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.users.token,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonListItem)
