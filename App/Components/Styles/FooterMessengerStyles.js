import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    minHeight: Metrics.paddingDefault * 3,
    paddingHorizontal: Metrics.paddingDefault,
    paddingVertical: Metrics.smallMargin,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#dbdbdb',
    alignItems: 'center'
  },
  footerTab: {
    height: Metrics.paddingDefault * 3,
    width: Metrics.paddingDefault * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconActive: {
    height: 27,
    resizeMode: 'contain',
    tintColor: Colors.pink
  },
  tabIcon: {
    width: 23,
    resizeMode: 'contain',
    tintColor: '#636363'
  },
  textInput: {
    width: Metrics.screenWidth - Metrics.bigMargin * 2.2,
    minHeight: 34,
    borderRadius: 17,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.baseMargin,
    fontFamily: Fonts.type.light,
    color: Colors.charcoal,
    fontSize: Fonts.size.small,
    lineHeight: Fonts.size.regular,
    marginTop: 0,
    textAlign: 'left'
  }
});
