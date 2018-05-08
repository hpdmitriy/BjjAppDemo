import React from 'react'
import PropTypes from 'prop-types'
import { TouchableNativeFeedback, TouchableHighlight, Platform, Text, View, Image } from 'react-native'
import { indexOf } from 'lodash'
import styles from './EventsCustomizerStyles'
import { findCategoryIcon } from '../../Services/ApiHelpers'

const checkIco = require('../../Images/Icons/check.png')

function EventsCustomizerItem (props) {
  const {onPressHandler, data, rowId, listLength, activeCategory, dimensions} = props
  const dopStyles = {}
  if (rowId === listLength) {
    dopStyles.borderBottomLeftRadius = 30
    dopStyles.borderBottomRightRadius = 30
    dopStyles.borderBottomColor = 'white'
  }
  const internals = (<View style={[styles.containerDropDownCategory, {width: dimensions.width}]}>
    <Image
      source={{uri: findCategoryIcon(data.category.name, 'png')}}
      style={styles.iconCategory}
    />
    <Text style={styles.nameCategory}>
      {data.category.name}
    </Text>
    {~indexOf(activeCategory, data.category.id) ? <Image
      source={checkIco}
      style={styles.checkedIcon}
    /> : null
    }
  </View>)
  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.categoryDropDownWrapper, {...dopStyles}]}>
        <TouchableHighlight onPress={() => onPressHandler(data.category.id)} activeOpacity={0.5} underlayColor={'#EF1B48'}>
          {internals}
        </TouchableHighlight>
      </View>
    )
  } else {
    return (
      <View style={[styles.categoryDropDownWrapper, {...dopStyles}]}>
        <TouchableNativeFeedback onPress={() => onPressHandler(data.category.id)}
                                 background={TouchableNativeFeedback.Ripple('rgba(239,27,82,0.5)', true)}>
          {internals}
        </TouchableNativeFeedback>
      </View>
    )
  }
}

EventsCustomizerItem.PropTypes = {
  activeCategory: PropTypes.array,
  onPressHandler: PropTypes.func,
  data: PropTypes.object,
  rowId: PropTypes.number,
  listLength: PropTypes.number
}

export default EventsCustomizerItem

// todo need add orientation change decorator
