import { StyleSheet } from 'react-native'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  statisticScoreIco: {
    width: 33 / 2.2,
    height: 36 / 2.2,
    marginRight: 2
  },
  lessonRate: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  scoreFire: {
    tintColor: Colors.fire
  },
  scoreGrey: {
    tintColor: Colors.lightgrey
  }
})
