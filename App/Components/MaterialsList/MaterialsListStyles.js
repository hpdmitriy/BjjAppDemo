import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent
  },
  categoryShadowWrapper: {
    marginHorizontal: Metrics.smallMargin / 2,
    backgroundColor: Colors.white,
    borderRadius: Metrics.section,
    marginVertical: Metrics.baseMargin / 2,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: Metrics.smallMargin,
    shadowOpacity: 0.5,
    elevation: 4,
    height: Metrics.bigMargin * 2,
  },
  containerCategory: {
    //flex: 1,
    borderRadius: Metrics.section,
    padding: Metrics.baseMargin,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Metrics.bigMargin * 2,
  },
  touchableRounded: {
    borderRadius: Metrics.section,
  },
  iconCategory: {
    height: Metrics.images.medium,
    width: Metrics.images.medium,
    borderRadius: Metrics.doubleBaseMargin,
  },
  nameCategory: {
    color: Colors.text,
    marginLeft: Metrics.baseMargin,
    fontSize: Fonts.size.regular,
    fontFamily: Fonts.type.light
  },
  containerMaterials: {
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
    paddingVertical: Metrics.doubleBaseMargin + 5,
    paddingHorizontal: Metrics.doubleBaseMargin + 15,
    overflow: 'hidden'
  },
  materialImage: {
    borderRadius: 24,
    position: 'absolute',
    top: 0,
    left: 5,
    bottom: 0,
    right: 5,
    zIndex: 1,
  },
  materialTitle: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.regular,
    color: Colors.white,
    lineHeight: Fonts.size.medium + 5
  },
  materialDate: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.small,
    color: Colors.white,
    lineHeight: Fonts.size.small,
    marginTop: Metrics.doubleBaseMargin,
  },
  materialInfo: {
    /*
     position: 'absolute',
     left: 35,
     bottom: 24,
     right: 35,
     */
    zIndex: 4
  },

})
