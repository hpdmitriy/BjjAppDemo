import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  containerStats: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    marginTop: Metrics.baseMargin
  },
  containerFullStatsHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.paddingDefault,
    borderBottomColor: Colors.steel,
    borderBottomWidth: 0.7
  },
  statsData: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  statsDataWrap: {
    //flex: 1,
  },
  statsDataText: {
    fontSize: Fonts.size.small,
    color: Colors.text,
    fontFamily: Fonts.type.light
  },
  statsIco: {
    marginRight: Metrics.baseMargin / 2,
    tintColor: Colors.text
  },
  containerFullStats: {
    marginHorizontal: Metrics.paddingDefault,
    overflow: 'hidden',
    paddingBottom: 18,
    marginVertical: Metrics.doubleBaseMargin,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    borderRadius: 24,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 5
  },
  fullStatsHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    alignSelf: 'flex-start',
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.paddingDefault,
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.lightgrey
  },
  containerStatsAverage: {
    marginTop: Metrics.baseMargin,
    paddingVertical: Metrics.paddingDefault,
    paddingHorizontal: Metrics.doubleBaseMargin,
    marginHorizontal: Metrics.paddingDefault,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grassGreen,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  statsAverageIco: {
    width: 45
  },
  statsAverageText: {
    flex: 1
  },
  statsGraphIco: {
    tintColor: Colors.grassGreen
  },
  statsAverageInfo: {
    fontSize: Fonts.size.small,
    color: Colors.grassGreen,
    fontFamily: Fonts.type.light,
    lineHeight: Fonts.size.small + 5
  },
  fullStatsDescription: {
    // padding: Metrics.doubleBaseMargin,
    //flexDirection: 'row',
    marginVertical: Metrics.doubleBaseMargin,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    borderRadius: 24,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 5
  },
  listItemWrapper: {
    marginHorizontal: Metrics.smallMargin / 2,
    backgroundColor: Colors.white,
    height: Metrics.bigMargin * 2,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: Colors.steel,
    marginBottom: 1
  },
  listItemContainer: {
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Metrics.bigMargin * 2,
  },
  listItemIcon: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: Metrics.doubleBaseMargin
  },
  listItemText: {
    color: Colors.text,
    fontSize: Fonts.size.small + 1,
    fontFamily: Fonts.type.light
  },
  listItemTextWrapper: {
    paddingRight: Metrics.doubleBaseMargin,
    flex: 1,
  },
  statisticNextButton: {
    width: 15 / 2,
    height: 27 / 2,
    tintColor: '#c6c6c6',
    // position: 'absolute',
    // right: -Metrics.baseMargin,
    // top: '50%',
    //alignSelf: 'flex-end'
  },

})
