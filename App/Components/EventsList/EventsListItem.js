import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { toUpper, isUndefined, isNull } from 'lodash'
import Label from '../../Components/Label'
import styles from './EventsListStyles'
import {
  addMainImg,
  formatDate
} from '../../Services/ApiHelpers'

function EventsListItem (props) {
  const {onPressHandler, data} = props
  const categoryName = toUpper(data.category.name)
  let mainImg = data.preview_url
  if (isNull(mainImg)) {
    mainImg = !isUndefined(data.attachments) && data.attachments.length
      ? addMainImg(data.attachments) : addMainImg(null)
  }
  return (
    <TouchableWithoutFeedback onPress={() => {
      return onPressHandler('OneEventScreen', {id: data.id, title: categoryName})}
    }>
      <View
        style={styles.containerEvents}>
        <Image source={{uri: mainImg}} style={styles.eventImage} />
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1.0)']}
          style={styles.containerGradient}
        >
          <View style={styles.eventInfo}>
            <Label
              text={`${categoryName}`}
              type={categoryName}
            />
            <Text
              style={styles.eventTitle}
            >
              { data.title }
            </Text>
            <Text style={styles.eventDate}>
              { formatDate(data.moderation.created_at) }
            </Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  )
}
EventsListItem.PropTypes = {
  onPress: PropTypes.func,
  data: PropTypes.object
}

export default EventsListItem
