import React from 'react'
import PropTypes from 'prop-types'
import {FlatList} from 'react-native'
import styles from './MaterialsListStyles'
import * as Animatable from 'react-native-animatable'
import OneMaterialsCategoryItem from './OneMaterialsCategoryItem'

/**
 * @return {null}
 */
function OneMaterialsCategory (props) {
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
              <OneMaterialsCategoryItem
                data={item}
                onPressHandler={() => onPress('OneMaterialScreen', {id: item.id, title: item.category.name})}
              />)
          }}
        />
      </Animatable.View>
    )
  }
}

OneMaterialsCategory.propTypes = {
  data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object
}
OneMaterialsCategory.defaultProps = {
  data: [],
}
export default OneMaterialsCategory
