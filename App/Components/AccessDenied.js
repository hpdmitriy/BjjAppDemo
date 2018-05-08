import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';
import { errors } from '../Controllers/ErrorHandler';
import ErrorView from '../Components/ErrorView';
import styles from './Styles/LoaderStyles';

function AccessDenied(props) {
  const {denied} = props;
  if (denied) {
    return (
      <ScrollView style={styles.modalBox}>
        <View onLayout={this.handleLayout} style={styles.modalContainer}>
          <ErrorView error={errors.ACCESS_DENIED} handler={() => {
            props.handler('LoginScreen');
          }} />
        </View>
      </ScrollView>
    );
  } else {
    return null;
  }
}
AccessDenied.propTypes = {
  denied: PropTypes.bool,
  handler: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ])
};

export default AccessDenied;
