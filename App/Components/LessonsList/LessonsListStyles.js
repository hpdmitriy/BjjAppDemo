import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent
  },
  containerLesson: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: Colors.transparent,
    alignSelf: 'flex-start',
    paddingHorizontal: Metrics.marginHorizontal / 2,
    width: Metrics.screenWidth,
    height: Metrics.screenWidth * 0.64
  },
  containerGradient: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    position: 'absolute',
    left: 5,
    bottom: 0,
    right: 5,
    // top: '50%',
    zIndex: 3,
    minHeight: (Metrics.screenWidth * 0.6) / 2,
    paddingVertical: Metrics.paddingDefault,
    paddingHorizontal: Metrics.doubleBaseMargin,
    overflow: 'hidden'
  },
  lessonImage: {
    borderRadius: 24,
    position: 'absolute',
    top: 0,
    left: 5,
    bottom: 0,
    right: 5,
    zIndex: 1,
  },
  lessonTitle: {
    fontFamily: Fonts.type.light,
    color: Colors.text,
    fontSize: Fonts.size.regular - 1
  },
  lessonDescription: {
    paddingVertical: Metrics.paddingDefault,
    fontFamily: Fonts.type.light,
    color: Colors.charcoal,
    fontSize: Fonts.size.small - 2,
    lineHeight: Fonts.size.regular
  },
  lessonAttributes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  lessonDate: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.small,
    color: Colors.text,
    lineHeight: Fonts.size.small,
    marginTop: Metrics.doubleBaseMargin,
  },
  lessonInfo: {
/*
    position: 'absolute',
    left: 35,
    bottom: 24,
    right: 35,
*/
    zIndex: 4
  }
})
export const lessonCategoryNav = StyleSheet.create({
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
  }
})
