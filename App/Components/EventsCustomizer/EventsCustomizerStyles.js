import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.windowTint,
    flex: 1,
    position: 'absolute',
    zIndex: 100,
    height: Metrics.screenHeight,
    width: Metrics.screenWidth
  },
  nameCategory: {
    marginLeft: Metrics.baseMargin + 2,
    fontSize: Fonts.size.regular,
    color: Colors.charcoal,
    fontFamily: Fonts.type.light
  },
  iconCategory: {
    height: Metrics.doubleBaseMargin * 2,
    width: Metrics.doubleBaseMargin * 2,
    borderRadius: Metrics.doubleBaseMargin
  },
  checkedIcon: {
    width: 30 / 2,
    height: 22 / 2,
    position: 'absolute',
    right: Metrics.paddingDefault
  },
  categoryDropDownWrapper: {
    height: 60,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    borderBottomColor: Colors.steel,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    flexDirection: 'row',
    //justifyContent: 'flex-start'
  },
  containerDropDownCategory: {
    paddingHorizontal: Metrics.paddingDefault,
    paddingVertical: Metrics.baseMargin,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
/*
    alignItems: 'center',
    justifyContent: 'flex-start'
*/
  }
});
