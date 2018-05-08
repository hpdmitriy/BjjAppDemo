import React from 'react'
import PropTypes from 'prop-types'
import {FlatList} from 'react-native'
import styles from './LessonsListStyles'
import * as Animatable from 'react-native-animatable'
import LessonsListItem from './LessonsListItem'

/**
 * @return {null}
 */
function LessonsList (props) {
  const {data, onPress, style, userProfile} = props
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
              <LessonsListItem
                userId={userProfile.userProfile.id}
                userRole={userProfile.userProfile.role}
                data={item}
                onPressHandler={onPress}
              />)
          }}
        />
      </Animatable.View>
    )
  }
}

LessonsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  userProfile: PropTypes.object
}
LessonsList.defaultProps = {
  data: [],
}
export default LessonsList
