import {StyleSheet} from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

const SearchBarEventsStyles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: Colors.pink,
    height: 50,
    paddingHorizontal: Metrics.baseMargin
  },
  searchIcon: {
    left: Metrics.doubleBaseMargin,
    alignSelf: 'center',
    color: Colors.snow,
    backgroundColor: Colors.transparent
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Metrics.baseMargin
  },
  buttonLabel: {
    color: Colors.snow,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.regular
  }
});

export { SearchBarEventsStyles };
