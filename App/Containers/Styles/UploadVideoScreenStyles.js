import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';

export default StyleSheet.create({
  mainContainer: {
    padding: 0,
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
    borderRadius: 0,
    borderTopWidth: 0,
    left: Metrics.screenWidth / 1.5,
    maxHeight: Metrics.screenHeight / 2
  },
  modalsWrap: {
    width: Metrics.screenWidth / 1.5,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  dropDownText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.type.light,
    lineHeight: 16,
    color: Colors.gray,
    borderColor: '#a0a0a0',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  dropDownTextHighlight: {
    borderColor: 'lightgray',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  textInput: {
    marginTop: Metrics.doubleBaseMargin*1.2,
    textAlign: 'center',
    minHeight: 50,
    color: Colors.grey,
    fontSize: 16,
    fontFamily: Fonts.type.light,
    width: Metrics.screenWidth / 1.5,
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
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  loginButton: {
    marginTop: Metrics.doubleSection,
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  uploaderWrap: {
    paddingHorizontal: Metrics.paddingDefault,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: Metrics.screenHeight - 45,
  },
  inputsWrap: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginBottom: Metrics.doubleBaseMargin
  },
  errorBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Metrics.baseMargin
  },
  errorText: {
    color: Colors.fire,
    fontSize: Fonts.size.medium
  },
  textWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Metrics.baseMargin,
    width: '90%',
    alignSelf: 'center'
  },
  uploadStatus: {
    width: '100%',
    textAlign: 'center',
    fontSize: 10,
    color: Colors.charcoal,
    fontFamily: Fonts.type.light
  },
  scoreChange: {
    alignSelf: 'center',
    textAlign: 'center',
    color: Colors.black,
    fontSize: 18,
    fontFamily: Fonts.type.light,
    width: Metrics.screenWidth / 1.5,
    lineHeight: 22,
    paddingBottom: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
    borderBottomColor: '#a0a0a0',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  }
});
