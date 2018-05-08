import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';
import styles from './Styles/NoDataStyles';

export default function NoData({text}) {
  return (
    <View style={styles.noData}>
      <Text style={styles.noDataText}>
        {text}
      </Text>
    </View>
  );
}
NoData.propTypes = {
  text: PropTypes.string.isRequired
};
