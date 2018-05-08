import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  noData: {
    flex: 1,
    justifyContent: 'center'
  },
  noDataText: {
    color: Colors.charcoal,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'normal',
    fontSize: 45,
    fontFamily: Fonts.type.light,
  }
});
