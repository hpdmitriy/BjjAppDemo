import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: Colors.white,
    flex: 1
  },
  scrollContainerContentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  scoreForm: {
    backgroundColor: Colors.white,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth / 1.3,
  },
  scoreTitle: {
    alignSelf: 'center',
    width: Metrics.screenWidth / 2,
    textAlign: 'center',
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.base,
    lineHeight: Fonts.size.h4,
    color: Colors.text,
    marginTop: 0,
    marginBottom: Metrics.doubleBaseMargin
  },
  scoreMessage: {
    alignSelf: 'center',
    width: Metrics.screenWidth / 2,
    textAlign: 'center',
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.light,
    lineHeight: Fonts.size.h6,
    color: Colors.text,
    marginBottom: Metrics.doubleBaseMargin
  },
  scoreInputSmallLabel: {
    alignSelf: 'flex-start',
    width: Metrics.screenWidth / 2,
    textAlign: 'left',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.light,
    lineHeight: Fonts.size.regular,
    color: Colors.grey
  },
  buttonSet: {
    marginTop: Metrics.baseMargin,
    flexDirection: 'row',
    justifyContent: 'center'
  }
})
