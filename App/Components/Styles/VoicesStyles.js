import { StyleSheet } from 'react-native'
import { Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  trainingCommentsWrap: {
    width: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  trainingComments: {
    width: 34 / 2.5,
    height: 34 / 2.5,
    tintColor: Colors.grey
  },
  trainingCommentsCounter: {
    fontFamily: Fonts.type.light,
    color: Colors.charcoal,
    fontSize: Fonts.size.small - 2
  },
})
