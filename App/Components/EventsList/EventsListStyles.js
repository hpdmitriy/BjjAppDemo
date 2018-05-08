import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent
  },
  containerEvents: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: Colors.transparent,
    alignSelf: 'flex-start',
    paddingHorizontal: Metrics.marginHorizontal / 2,
    width: Metrics.screenWidth,
    height: Metrics.screenWidth * 0.715
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
    minHeight: (Metrics.screenWidth * 0.715) / 2,
    paddingVertical: Metrics.doubleBaseMargin + 5,
    paddingHorizontal: Metrics.doubleBaseMargin + 15,
    overflow: 'hidden'
  },
  eventImage: {
    borderRadius: 24,
    position: 'absolute',
    top: 0,
    left: 5,
    bottom: 0,
    right: 5,
    zIndex: 1,
  },
  eventTitle: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium,
    color: Colors.white,
    lineHeight: Fonts.size.medium + 5
  },
  eventDate: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.small,
    color: Colors.white,
    lineHeight: Fonts.size.small,
    marginTop: Metrics.doubleBaseMargin,
  },
  eventInfo: {
/*
    position: 'absolute',
    left: 35,
    bottom: 24,
    right: 35,
*/
    zIndex: 4
  },
})
