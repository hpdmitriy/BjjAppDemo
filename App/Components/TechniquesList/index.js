import React from 'react'
import PropTypes from 'prop-types'
import {FlatList} from 'react-native'
import styles from './TechniquesListStyles'
import * as Animatable from 'react-native-animatable'
import TechniquesListItem from './TechniquesListItem'

/**
 * @return {null}
 */
function TechniquesList (props) {
  const {data, onPress, width} = props
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
              <TechniquesListItem
                data={item}
                width={width}
                onPressHandler={() => onPress(item.id, item.name)}
              />)
          }}
        />
      </Animatable.View>
    )
  }
}

TechniquesList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object
}
TechniquesList.defaultProps = {
  data: []
}
export default TechniquesList
