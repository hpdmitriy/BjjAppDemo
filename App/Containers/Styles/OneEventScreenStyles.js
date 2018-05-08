import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  scrollContainer: {
    backgroundColor: Colors.white,
    paddingBottom: Metrics.bigMargin
  },
  title: {
    fontSize: Fonts.size.h4,
    color: Colors.text,
    fontFamily: Fonts.type.light,
    paddingBottom: Metrics.bigMargin,
  },
  content: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    fontFamily: Fonts.type.light
  },
  textBlock: {
    padding: Metrics.bigMargin,

  },
  mainImage: {
    flex: 1,
    alignSelf: 'center',
    width: Metrics.screenWidth,
    height: Metrics.screenWidth * 0.54
  }

});
