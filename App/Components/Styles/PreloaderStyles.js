import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 30 * Metrics.baseMargin,
    minHeight: 20 * Metrics.baseMargin,
    backgroundColor: Colors.white,
    borderRadius: Metrics.baseMargin,
    padding: Metrics.baseMargin * 2,
  },
  title: {
    width: '100%',
    paddingBottom: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.input,
    color: Colors.text,
  },
  message: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    lineHeight: Fonts.type.base*2,
    fontSize: Fonts.size.medium,
    color: Colors.charcoal
  },
});
