import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import GoToScreenButton from '../Decorators/goToScreen';
import {applyLetterSpacing} from '../Services/ApiHelpers';
import styles from './Styles/RoundedButtonStyles';

function RoundButton(props) {
  const {text, dopStyles, dopTextStyles, spaced, onPress} = props;
  return (
    <Animatable.View
      animation='pulse'
      iterationCount={1}
    >
      <TouchableOpacity
        style={[styles.buttonFill, dopStyles]}
        onPress={() => onPress()}
      >
        <Text
          style={[styles.buttonFillText, dopTextStyles]}
        >
          {spaced ? applyLetterSpacing(text) : text}
        </Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}
RoundButton.propTypes = {
  text: PropTypes.string,
  dopStyles: PropTypes.object,
  dopTextStyles: PropTypes.object,
  spaced: PropTypes.bool,
  navigator: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  navigate: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
};

RoundButton.defaultProps = {
  spaced: true
};

export default GoToScreenButton(RoundButton);
