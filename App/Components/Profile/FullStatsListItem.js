import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image, TouchableNativeFeedback, TouchableHighlight, Platform } from 'react-native'
import styles from './StatsStyles'
import Rating from '../../Components/Rating'
import { isUndefined } from 'lodash'
import { MEDIA_PATH } from '../../Config/Constants'
import { addMainImg, calcLessonRating } from '../../Services/ApiHelpers'

const rightIco = require('../../Images/Icons/right.png');

function FullStatsListItem (props, context) {
  const {data, role, activeTab} = props
  const {navigate} = context
  if (data === null) return null
  let internals = null
  let clickHandler = () => null
  if (activeTab === 1) {
    const thisLessonScore = calcLessonRating(data.ratings, data.id)
    let mainImg = data.preview_url
    if (mainImg === null) {
      mainImg = !isUndefined(data.attachments) && data.attachments.length
        ? addMainImg(data.attachments) : addMainImg(null)
    }
    clickHandler = () => navigate('OneLessonScreen', {id: data.id, title: data.title})
    internals = (<View style={[styles.listItemContainer]}>
      <Image
        source={{uri: mainImg}}
        style={styles.listItemIcon}
      />
      <View style={styles.listItemTextWrapper}>
        <Text style={styles.listItemText}>
          {data.title}
        </Text>
        <Rating type='lessonRate' count={5} score={thisLessonScore} />
      </View>
      <Image
        style={[styles.statisticNextButton]}
        source={rightIco}
      />
    </View>)
  }
  if (activeTab === 2) {
    const thisLessonScore = data.mark === null ? 0 : data.mark
    let mainImg = data.lesson.preview_url
    if (mainImg === null) {
      mainImg = addMainImg(null)
    }
    clickHandler = () => navigate('OneTrainingScreen', {id: data.id, title: data.lesson.title})
    internals = (<View style={[styles.listItemContainer]}>
      <Image
        source={{uri: mainImg}}
        style={styles.listItemIcon}
      />
      <View style={styles.listItemTextWrapper}>
        <Text style={styles.listItemText}>
          {data.lesson.title}
        </Text>
        <Rating type='lessonRate' count={5} score={thisLessonScore} />
      </View>
      <Image
        style={[styles.statisticNextButton]}
        source={rightIco}
      />
    </View>)
  }
  if (activeTab === 3) {
    const thisLessonScore = data.mark === null ? 0 : data.mark
    let mainImg = data.lesson.preview_url
    if (mainImg === null) {
      mainImg = addMainImg(null)
    }
    clickHandler = () => navigate('OneTrainingScreen', {id: data.id, title: data.lesson.title})
    internals = (<View style={[styles.listItemContainer]}>
      <Image
        source={{uri: mainImg}}
        style={styles.listItemIcon}
      />
      <View style={styles.listItemTextWrapper}>
        <Text style={styles.listItemText}>
          {data.lesson.title}
        </Text>
        <Rating type='lessonRate' count={5} score={thisLessonScore} />
      </View>
      <Image
        style={[styles.statisticNextButton]}
        source={rightIco}
      />
    </View>)
  }

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.listItemWrapper]}>
        <TouchableHighlight
          style={styles.touchableRounded}
          onPress={clickHandler}
          activeOpacity={0.5}
          underlayColor={'#EF1B48'}
        >
          {internals}
        </TouchableHighlight>
      </View>
    )
  } else {
    return (
      <View style={styles.listItemWrapper}>
        <TouchableNativeFeedback
          onPress={clickHandler}
          background={TouchableNativeFeedback.Ripple('rgba(239,27,82,0.5)', true)}
        >
          {internals}
        </TouchableNativeFeedback>
      </View>
    )
  }
}

FullStatsListItem.propTypes = {
  data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  onPress: PropTypes.func,
}
FullStatsListItem.defaultProps = {
  data: null,
}
FullStatsListItem.contextTypes = {
  navigate: PropTypes.func,
}

export default FullStatsListItem
