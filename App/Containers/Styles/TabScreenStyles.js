import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts, ApplicationStyles } from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  grayContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundGray
  },
  silverContainer: {
    flex: 1,
    backgroundColor: Colors.silver
  },
  header: {
    height: Metrics.doubleSection - 10,
    backgroundColor: '#f01c32',
    elevation: null,
    shadowOpacity: 0,
    paddingHorizontal: 15,
    // borderTopWidth: 3,
    // borderTopColor: 'green'
  },
  headerTitle: {
    color: Colors.white,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: Fonts.base,
    fontWeight: 'normal'
  },
  headerBackButtonWrap: {
    width: 30,
    height: 30,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  headerBackButton: {
    width: 11,
    height: 20,
    tintColor: Colors.white,
    //alignSelf: 'flex-start'
  },
  headerBookutton: {
    width: 15,
    height: 20,
    tintColor: Colors.white,
    marginTop: 2
  },
  headerCameraButton: {
    width: 21,
    height: 20,
    tintColor: Colors.white,
    marginTop: 2
  },
  headerCloseButton: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
    marginTop: 2,
  },
  headerFirstButton: {
    width: 20,
    height: 20,
    tintColor: Colors.white,
    marginTop: 2,
    resizeMode: 'contain'
  },
  headerNoopButton: {
    width: 11,
    height: 20,
    tintColor: Colors.transparent
  },
  headerNextButton: {
    width: 11,
    height: 20,
    tintColor: Colors.white
  },
  headerCustomizeButton: {
    width: 20,
    height: 20
  },
  headerSettingsButton: {
    width: 18,
    height: 20
  },
  headerSearchButton: {
    width: 20,
    height: 20
  },
  icon: {
    height: 27,
    resizeMode: 'contain',
  },
  headerDownButton: {
    height: 20,
    width: 30,
    tintColor: Colors.white,
    resizeMode: 'center'
  },

  scrollContainer: {
    padding: 15,
    backgroundColor: Colors.white
  },

  loginForm: {
    backgroundColor: Colors.white,
    margin: 0,
    alignSelf: 'center',
    width: Metrics.screenWidth / 1.5,
  },
  loginTitle: {
    alignSelf: 'center',
    width: Metrics.screenWidth / 2,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.light,
    lineHeight: 22,
    color: Colors.text,
    marginTop: Metrics.doubleBaseMargin,
    marginBottom: Metrics.doubleBaseMargin
  },
  // row: {
  //   paddingVertical: Metrics.doubleBaseMargin,
  //   paddingHorizontal: Metrics.doubleBaseMargin
  // },
  rowLabel: {
    textAlign:'center',
    fontSize: 16,
    fontFamily: Fonts.type.light,
    lineHeight: 22,
    color: Colors.gray,
    paddingBottom: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
    borderBottomColor: '#a0a0a0',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },
  rowCentred: {
    width: Metrics.screenWidth / 1.5,
    alignSelf: 'center',
  },
  dropDownBox: {
    width: Metrics.screenWidth / 1.5,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#a0a0a0',
    marginHorizontal:0,
    borderRadius:0,
    borderTopWidth: 0,
    maxHeight: Metrics.screenHeight / 2
  },
  dropDownText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.light,
    lineHeight: 20,
    color: Colors.gray,
    borderColor: '#a0a0a0',
  },
  textInput: {
    marginTop: Metrics.doubleBaseMargin*1.2,
    textAlign: 'center',
    height: 50,
    color: Colors.grey,
    fontSize: 16,
    fontFamily: Fonts.type.light,
  },
  textInputConfirm: {
    marginTop: 0,
    textAlign: 'center',
    height: 70,
    color: '#f11c1c',
    fontSize: 45,
    fontFamily: Fonts.type.light,
  },
  textInputFocus: {
    color: Colors.text,
  },
  inputDecor: {
    marginTop: -Metrics.baseMargin,
    width: Metrics.screenWidth / 1.5,
    alignSelf: 'center',
    height: 9,
    borderColor: Colors.white,
    borderWidth: 1,
    borderStyle: 'solid',
    borderTopColor: Colors.white,
    borderBottomColor: '#a0a0a0',
  },
  inputDecorFocus: {
    borderColor: Colors.pink,
    borderBottomColor: Colors.pink,
    borderTopColor: Colors.white
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
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
  noData: {
    flex: 1,
    justifyContent: 'center'
  },
  noDataText: {
    color: Colors.charcoal,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'normal',
    fontSize: 45,
    fontFamily: Fonts.type.light,
  }
});
