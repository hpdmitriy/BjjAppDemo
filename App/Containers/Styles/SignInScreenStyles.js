import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: Metrics.doubleBaseMargin,
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
})
