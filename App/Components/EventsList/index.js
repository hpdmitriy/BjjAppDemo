import React from 'react'
import PropTypes from 'prop-types'
import {FlatList} from 'react-native'
import styles from './EventsListStyles'
import * as Animatable from 'react-native-animatable'
import EventsListItem from './EventsListItem'

/**
 * @return {null}
 */
function EventsList (props) {
  const {data, onPress, style} = props
  if (data === null || data.length === 0) {
    return null
  } else {
    return (
      <Animatable.View
        style={[styles.container, {paddingBottom: 50}]}
        animation='fadeIn'
        iterationCount={1}
      >
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (
              <EventsListItem
                data={item}
                onPressHandler={() => onPress('OneEventScreen', {id: item.id, title: item.category.name})}
              />)
          }}
        />
      </Animatable.View>
    )
  }
}

EventsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object
}
EventsList.defaultProps = {
  data: [],
}
export default EventsList
