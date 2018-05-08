import { AppRegistry } from 'react-native';
import './App/Config/ReactotronConfig';

import App from './App/Containers/App';
console.ignoredYellowBox = [
  'Setting a timer'
];

AppRegistry.registerComponent('Bjj4All', () => App);
