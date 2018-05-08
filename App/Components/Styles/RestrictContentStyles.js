import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  content: {
    paddingHorizontal: Metrics.paddingDefault,
    paddingTop: Metrics.doubleBaseMargin,
    flex: 1,
    // flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    fontFamily: Fonts.type.light,
    marginBottom: Metrics.baseMargin
  },
  text: {
    fontSize: Fonts.size.small,
    lineHeight: Fonts.size.small +5,
    color: Colors.text,
    fontFamily: Fonts.type.light,
    marginBottom: Metrics.baseMargin,
    alignSelf: 'center'
  }
})
