import { StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  button: {
    height: 45,
    borderRadius: 5,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    justifyContent: 'center'
  },

  buttonFill: {
    height: 56,
    borderRadius: 28,
    marginHorizontal: Metrics.section,
    marginVertical: Metrics.baseMargin,
    backgroundColor: Colors.pinkMore,
    justifyContent: 'center',
    paddingLeft: Metrics.baseMargin * 6,
    paddingRight: Metrics.baseMargin * 6,
    borderWidth: 1.5,
    borderColor: Colors.pinkMore,
  },
  buttonFillText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: Fonts.size.h5,
    marginVertical: Metrics.baseMargin,
    fontFamily: Fonts.type.light
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.medium,
    marginVertical: Metrics.baseMargin
  }
})
