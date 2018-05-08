import { Text } from 'react-native';
import DebugConfig from './DebugConfig';
import AppConfig from './AppConfig';

export default () => {
  if (__DEV__) { // eslint-disable-line no-undef
    console.disableYellowBox = !DebugConfig.yellowBox;
    console.ignoredYellowBox = [
      'Setting a timer'
    ]
  }
  Text.defaultProps.allowFontScaling = AppConfig.allowTextFontScaling;
};
