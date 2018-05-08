import { StyleSheet, Platform } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';
export default StyleSheet.create({
  textInput: {
    marginTop: Metrics.doubleBaseMargin * 1.2,
    textAlign: 'center',
    height: 40,
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
  searchInput: {
    marginTop: Metrics.baseMargin,
    height: Metrics.searchBarHeight,
    padding: Metrics.smallMargin,
    textAlign: 'left',
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.instructions,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.snow,
    paddingLeft: 30,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  textInputFocus: {
    color: Colors.text,
  },
  inputDecor: {
    marginTop: -Metrics.baseMargin,
    width: Metrics.screenWidth / 1.5,
    alignSelf: 'center',
    height: Platform.OS === 'ios' ? 1 :8,
    borderColor: Platform.OS === 'ios' ? '#a0a0a0' : Colors.white,
    borderWidth: 0.8,
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
  }
});
