import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Themes/';

const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: Colors.white
  },
  scrollContainer: {
    backgroundColor: Colors.white,
    paddingBottom: Metrics.bigMargin
  },
  scrollContainer100: {
    backgroundColor: Colors.transparent,
    paddingBottom: Metrics.bigMargin,
    //paddingHorizontal: Metrics.paddingDefault,
    width: Metrics.screenWidth,
    minHeight: Metrics.screenHeight
  },
  materialHeader: {
    paddingHorizontal: Metrics.paddingDefault,
    paddingTop: Metrics.doubleBaseMargin,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  materialTitle: {
    fontSize: Fonts.size.h5,
    color: Colors.text,
    fontFamily: Fonts.type.light,
  },
  content: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    fontFamily: Fonts.type.light,
    lineHeight: Fonts.size.medium * 1.5
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

const htmlStyles = {
  img: {
    marginBottom: Metrics.paddingDefault
  },
  p: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    fontFamily: Fonts.type.light,
    lineHeight: Fonts.size.medium * 1.5
  },
  h5: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    fontFamily: Fonts.type.light,
    lineHeight: Fonts.size.medium * 1.5
  }

};

export {
  baseStyles,
  htmlStyles
};
