import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, TouchableWithoutFeedback } from 'react-native'
import styles from './EventsCustomizerStyles'
import * as Animatable from 'react-native-animatable'
import EventsCustomizerItem from './EventsCustomizerItem'
import NoData from '../NoData'

/**
 * @return {null}
 */

function EventsCustomizer (props) {
  const {data, onPress, activeCategory, show, closeHandler, dimensions} = props
  return data.length && show ? (
    <TouchableWithoutFeedback onPress={() => closeHandler()}>
      <Animatable.View
        style={[styles.container, {width: dimensions.width, height: dimensions.height}]}
        animation='fadeIn'
        iterationCount={1}
        onPress={() => console.log('sdf')}
      >
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => {
            return (
              <EventsCustomizerItem
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
EventsCustomizer.propTypes = {
  data: PropTypes.array.isRequired,
  onPress: PropTypes.func.isRequired,
  activeCategory: PropTypes.array.isRequired,
  closeHandler: PropTypes.func
}
EventsCustomizer.defaultProps = {
  data: [],
  show: false,
  closeHandler: () => null
}
export default EventsCustomizer
