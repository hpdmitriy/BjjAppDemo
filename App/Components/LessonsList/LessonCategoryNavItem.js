import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableNativeFeedback, TouchableHighlight, Platform, Text, View, Image } from 'react-native'
import {lessonCategoryNav as styles}  from './LessonsListStyles'
import {MEDIA_PATH} from '../../Config/Constants';

const checkIco = require('../../Images/Icons/check.png')

class LessonCategoryNavItem extends PureComponent {
  static propTypes = {
    onPressHandler: PropTypes.func,
    data: PropTypes.object,
    rowId: PropTypes.number,
    listLength: PropTypes.number,
    activeCategory:PropTypes.number,
    dimensions: PropTypes.object
  }
  constructor () {
    super()
    this.state = {
      imgUrl: `${MEDIA_PATH}category_technique_default.png`
    }
  }
  async componentWillMount () {
    this.fetchData(this.props.data.id)
  }
  fetchData = async (id) => {
    try {
      const response = await fetch(`${MEDIA_PATH}category_icon_id_${id}.png`)
      if(response.ok) {
        this.setState({imgUrl: `${MEDIA_PATH}category_icon_id_${id}.png`})
      }
    } catch (error) {
      console.log(error);
    }
  }

  render () {
    const {onPressHandler, data, rowId, listLength, activeCategory, dimensions} = this.props
    const dopStyles = {}
    if (rowId === listLength) {
      dopStyles.borderBottomLeftRadius = 30
      dopStyles.borderBottomRightRadius = 30
      dopStyles.borderBottomColor = 'white'
    }
    const {imgUrl} = this.state

    const internals = (
      <View style={[styles.containerDropDownCategory, {width: dimensions.width}]}>
        <Image
          source={{uri: imgUrl}}
          style={styles.iconCategory}
        />
        <Text style={styles.nameCategory}>
          {data.name}
        </Text>
        {activeCategory === data.id ? <Image
          source={checkIco}
          style={styles.checkedIcon}
        /> : null
        }
      </View>
    )
    if (Platform.OS === 'ios') {
      return (
      <View style={[styles.categoryDropDownWrapper, {...dopStyles}]}>
        <TouchableHighlight onPress={() => onPressHandler(data.id, data.name)} activeOpacity={0.5} underlayColor={'#EF1B48'}>
          {internals}
        </TouchableHighlight>
      </View>
      )
    } else {
      return (
        <View style={[styles.categoryDropDownWrapper, {...dopStyles}]}>
          <TouchableNativeFeedback
            onPress={() => onPressHandler(data.id, data.name)}
            background={TouchableNativeFeedback.Ripple('rgba(239,27,82,0.5)', true)}>
            {internals}
          </TouchableNativeFeedback>
        </View>
      )
    }
  }
}
export default LessonCategoryNavItem
