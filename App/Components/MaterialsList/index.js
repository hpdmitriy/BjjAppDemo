import React from 'react'
import PropTypes from 'prop-types'
import {FlatList} from 'react-native'
import styles from './MaterialsListStyles'
import * as Animatable from 'react-native-animatable'
import MaterialsCategoriesListItem from './MaterialsCategoriesListItem'

/**
 * @return {null}
 */
function MaterialsCategoriesList (props) {
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
              <MaterialsCategoriesListItem
                data={item}
                width={width}
                onPressHandler={() => onPress('OneMaterialCategoryScreen', {id: item.id, title: item.name})}
              />)
          }}
        />
      </Animatable.View>
    )
  }
}

MaterialsCategoriesList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object
}
MaterialsCategoriesList.defaultProps = {
  data: []
}
export default MaterialsCategoriesList
