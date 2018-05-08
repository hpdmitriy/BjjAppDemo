import { StyleSheet } from 'react-native';
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContainerContentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  sectionWelcome: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: Metrics.section * 1.3,
  },
  sectionText: {
    color: Colors.text,
    textAlign: 'center',
    fontFamily: Fonts.type.light,
    fontSize: Metrics.screenWidth / 25,
    lineHeight: 25,
    paddingBottom: Metrics.section,
  },
  titleText: {
    letterSpacing: 2,
    fontFamily: Fonts.type.light,
    fontSize: Metrics.screenWidth / 15,
    paddingBottom: Metrics.section,
    color: Colors.text
  }
});
