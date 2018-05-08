import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { isUndefined, isNull, toUpper } from 'lodash'
import styles from './MaterialsListStyles'
import {
  addMainImg,
  formatDate
} from '../../Services/ApiHelpers'

function OneMaterialsCategoryItem (props) {
  const {onPressHandler, data} = props
  let mainImg = data.preview_url
  if (isNull(mainImg)) {
    mainImg = !isUndefined(data.attachments) && data.attachments.length
      ? addMainImg(data.attachments) : addMainImg(null)
  }
  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <View
        style={styles.containerMaterials}>
        <Image source={{uri: mainImg}} style={styles.materialImage} />
        <LinearGradient
          colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1.0)']}
          style={styles.containerGradient}
        >
          <View style={styles.materialInfo}>
            <Text
              style={styles.materialTitle}
            >
              { data.title }
            </Text>
            <Text style={styles.materialDate}>
              { formatDate(data.moderation.created_at) }
            </Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  )
}
OneMaterialsCategoryItem.PropTypes = {
  onPress: PropTypes.func,
  data: PropTypes.object
}

export default OneMaterialsCategoryItem
