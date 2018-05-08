import React from 'react'
import PropTypes from 'prop-types'
import {FlatList} from 'react-native'
import styles from './TrainingsListStyles'
import * as Animatable from 'react-native-animatable'
import TrainingsListItem from './TrainingsListItem'

/**
 * @return {null}
 */
function TrainingsList (props) {
  const {data, onPress, userProfile} = props
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
              <TrainingsListItem
                userId={userProfile.id}
                data={item}
                onPressHandler={onPress}
              />)
          }}
        />
      </Animatable.View>
    )
  }
}

TrainingsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
  onPress: PropTypes.func,
  style: PropTypes.object,
  userProfile: PropTypes.object
}
TrainingsList.defaultProps = {
  data: [],
}
export default TrainingsList
