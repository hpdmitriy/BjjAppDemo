import React from 'react'
import PropTypes from 'prop-types'
import { Image, Text, View, ScrollView } from 'react-native'
import { isUndefined, isNull, find } from 'lodash'
import HTMLView from '../../Lib/react-native-htmlview/'
import RestrictContent from '../../Components/RestrictContent'
import { baseStyles, htmlStyles } from '../../Containers/Styles/OneMaterialScreenStyles'
import { Metrics } from '../../Themes/'
import {
  addMainImg,
  restrictContentByTariff
} from '../../Services/ApiHelpers'

/**
 * @return {null}
 */
function OneMaterial (props) {
  const {data, dimensions, orientation, user, navigate} = props
  let imgWidth = 0
  let imgHeight = 0
  if (orientation === 'portrait') {
    imgWidth = dimensions.width
    imgHeight = imgWidth / 1.5
  } else {
    imgWidth = dimensions.width / 2
    imgHeight = imgWidth / 1.5
  }
  if (isNull(data)) {
    return null
  } else {
    const restrictContent = restrictContentByTariff(user, data.access_tags)
    let mainImg = data.preview_url
    if (isNull(mainImg)) {
      mainImg = !isUndefined(data.attachments) && data.attachments.length
        ? addMainImg(data.attachments) : addMainImg(null)
    }
    return isNull(data) ? null : (
      <ScrollView style={[baseStyles.container, {marginBottom: 40}]}>
        <Image source={{uri: mainImg}} style={{
          alignSelf: 'center',
          width: imgWidth,
          height: imgHeight
        }} />
        <View style={baseStyles.materialHeader}>
          <Text style={baseStyles.materialTitle}>{data.title}</Text>
        </View>
        { +restrictContent === +0 ? <HTMLView
          value={data.content}
          stylesheet={htmlStyles}
          style={{paddingBottom: Metrics.doubleBaseMargin}}
          NodeComponent={Text}
          TextComponent={Text}
          blockStyles={{paddingHorizontal: 15, paddingTop: 15}}
          textStyles={baseStyles.content}
        /> : <RestrictContent tariff={find(user.userAvailableTariffs, (t) => t.id === restrictContent)} navigate={navigate} navigator='ProfileScreen' />
        }
      </ScrollView>)
  }
}

OneMaterial.PropTypes = {
  data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  user: PropTypes.object,
  navigate: PropTypes.func
}

export default OneMaterial
