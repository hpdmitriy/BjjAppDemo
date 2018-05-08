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
  loginForm: {
    backgroundColor: Colors.white,
    margin: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: Metrics.screenWidth / 1.3,
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  loginTitle: {
    alignSelf: 'center',
    width: Metrics.screenWidth / 2,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.light,
    lineHeight: 22,
    color: Colors.text,
    marginTop: 0,
    marginBottom: Metrics.doubleBaseMargin
  },
  loginComment: {
    alignSelf: 'center',
    width: Metrics.screenWidth / 1.3,
    textAlign: 'center',
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.light,
    lineHeight: Fonts.size.small *1.5,
    color: Colors.charcoal,
    marginTop: 0,
    marginBottom: Metrics.doubleBaseMargin
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginButtonWrapper: {
    flex: 1
  },
  // loginButton: {
  //   flex: 1,
  //   borderWidth: 1,
  //   borderColor: Colors.charcoal,
  //   backgroundColor: Colors.panther,
  //   padding: 6
  // },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  loginButton: {
    marginTop: Metrics.doubleSection,
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
})
