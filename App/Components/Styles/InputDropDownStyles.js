import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes';
export default StyleSheet.create({
  rowLabel: {
    width: Metrics.screenWidth / 1.5,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.light,
    lineHeight: 22,
    color: Colors.grey,
    paddingBottom: Metrics.baseMargin,
    paddingTop: Metrics.baseMargin,
    borderBottomColor: '#a0a0a0',
    borderBottomWidth: 0.8,
    borderStyle: 'solid'
  },
  rowCentred: {
    width: Metrics.screenWidth / 1.5,
    alignSelf: 'center'
  },
  dropDownBox: {
    alignSelf: 'center',
    width: Metrics.screenWidth / 1.5,
    borderWidth: 0,
    borderStyle: 'solid',
    borderColor: '#a0a0a0',
    marginHorizontal: 0,
    borderRadius: 0,
    borderTopWidth: 0,
    maxHeight: Metrics.screenHeight / 2
  },
  dropDownText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: Fonts.type.light,
    lineHeight: 20,
    color: Colors.grey,
    borderColor: '#a0a0a0'
  }
});
