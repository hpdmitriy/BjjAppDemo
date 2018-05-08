import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, ApplicationStyles} from '../../Themes';


export default StyleSheet.create({
  ...ApplicationStyles.screen,
  grayContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundGray,
    paddingVertical: Metrics.paddingDefault,
    minHeight: Metrics.screenHeight
  },
  settingSectionHeader: {
    paddingVertical: Metrics.paddingDefault,
    paddingHorizontal: Metrics.paddingDefault
  },
  settingSectionTitle: {
    color: Colors.steel,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.regular
  },
  settingSectionSet: {
    backgroundColor: Colors.white,
    borderTopWidth: 0.5,
    borderTopColor: '#cbc8d8'

  },
  settingSectionItem: {
    paddingVertical: Metrics.baseMargin + 2.2,
    paddingHorizontal: Metrics.paddingDefault,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: Colors.white,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cbc8d8',

  },
  settingItemText: {
    color: Colors.text,
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium
  },
  settingNextButton: {
    resizeMode: 'contain',
    tintColor: '#c5c5c5'
  }
});
