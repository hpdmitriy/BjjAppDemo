import React from 'react'
import PropTypes from 'prop-types'
import { FlatList, Text, ScrollView } from 'react-native'
import styles from './StatsStyles'
import * as Animatable from 'react-native-animatable'
import FullStatsListItem from './FullStatsListItem'

/**
 * @return {null}
 */
function FullStatsList (props) {
  const {data, activeTab, role, dimensions} = props
  if (data === null || data.length === 0) {
    return null
  } else {
    return (
      <Animatable.View
        style={[styles.container, {paddingBottom: 20}]}
        animation='fadeIn'
        iterationCount={1}
      >
        <FlatList
          contentContainerStyle={{alignItems: 'center'}}
          data={activeTab === 3 ? data.filter(item => item.mark !== null) : data}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => {
            return (
              <FullStatsListItem
                index={index}
                data={item}
                activeTab={activeTab}
                role={role}
                onPress={() => null}
              />
            )
          }}
        />
      </Animatable.View>
    )
  }
}

FullStatsList.propTypes = {
  data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.array]),
  onPress: PropTypes.func,
  activeTab: PropTypes.number,
  role: PropTypes.string
}
FullStatsList.defaultProps = {
  data: [],
}

export default FullStatsList
