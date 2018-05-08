import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, TouchableWithoutFeedback } from 'react-native'
import {lessonCategoryNav} from './LessonsListStyles'
import * as Animatable from 'react-native-animatable'
import LessonCategoryNavItem from './LessonCategoryNavItem'

/**
 * @return {null}
 */

function LessonCategoryNav (props) {
  const {data, onPress, activeCategory, show, closeHandler, dimensions} = props
  return data.length && show ? (
    <TouchableWithoutFeedback onPress={() => closeHandler()}>
      <Animatable.View
        style={[lessonCategoryNav.container, {width: dimensions.width, height: dimensions.height}]}
        animation='fadeIn'
        iterationCount={1}
        onPress={() => console.log('sdf')}
      >

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => {
            return (
              <LessonCategoryNavItem
                dimensions={dimensions}
                data={item}
                onPressHandler={onPress}
                activeCategory={activeCategory}
                rowId={++index}
                listLength={data.length}
              />)
          }}
        />

      </Animatable.View>
    </TouchableWithoutFeedback>
  ) : null
}
LessonCategoryNav.propTypes = {
  data: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  activeCategory: PropTypes.number.isRequired,
  closeHandler: PropTypes.func
}
LessonCategoryNav.defaultProps = {
  data: [],
  show: false,
  closeHandler: () => null
}
export default LessonCategoryNav
