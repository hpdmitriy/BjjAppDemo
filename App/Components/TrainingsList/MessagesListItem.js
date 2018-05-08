import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Image, Text, View } from 'react-native'
import { find, isNil, isNull } from 'lodash'
//import LessonsActions from '../../Redux/LessonsRedux'
import WebViewYoutube from '../../Components/WebViewYoutube'
import styles from './TrainingsListStyles'
import { findMarkVideoId, formatMessageDate } from '../../Services/ApiHelpers'
import { difficultyListSelector, lessonDifficultySelectorFactory } from '../../selectors'

const profileIco = require('../../Images/Icons/profile.png')

function MessagesListItem (props) {
  const {data, userId, rowId, mark} = props
  const fromMessage = userId === data.from_user_id
  const firstRow = rowId === 0
  const videoId = findMarkVideoId(data)
  if (fromMessage) {
    if (isNull(data.text)) {
      return null
    } else {
      return (
        <View
          style={[styles.trainingMessageWrapLeft, {marginTop: firstRow ? 30 : 10}]}
        >
          <View style={[styles.trainingMessageAvatar, {marginRight: 10}]}>
            <Image
              source={profileIco}
              style={styles.iconProfile}
            />
          </View>
          <View style={[styles.trainingMessageText]}>
            {!isNull(videoId) ? <WebViewYoutube video={videoId} /> :
              <View style={styles.trainingMessageTextMsgWrap}>
                <Text
                  style={[styles.trainingMessageTextMsg]}
                >
                  {data.text}
                </Text>
              </View>
            }
            <Text style={styles.trainingMessageTextDate}>
              {formatMessageDate(data.updatedAt, 'MM.DD.YYYY LT')}
            </Text>
          </View>
        </View>
      )
    }
  } else {
    if (isNull(data.text)) {
      return null
    } else {
      return (
        <View
          style={[styles.trainingMessageWrapRight, {marginTop: firstRow ? 30 : 10}]}
        >
          <View style={[styles.trainingMessageText]}>
            {!isNull(videoId) ? <WebViewYoutube video={videoId} />
              : <View style={styles.trainingMessageTextMsgWrap}>
                <Text style={[styles.trainingMessageTextMsg]} >
                  {data.text}
                </Text>
              </View>
            }
            <Text style={[styles.trainingMessageTextDate, {textAlign: 'right'}]}>
              {formatMessageDate(data.updatedAt, 'MM.DD.YYYY LT')}
            </Text>
          </View>
          <View style={[styles.trainingMessageAvatar, {marginLeft: 10}]}>
            <Image
              source={profileIco}
              style={styles.iconProfile}
            />
          </View>
        </View>
      )
    }
  }
}

export default MessagesListItem
