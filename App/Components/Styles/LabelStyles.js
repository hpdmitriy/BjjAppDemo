import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  label: {
    height: 20,
    borderRadius: 10,
    marginHorizontal: 0,
    marginVertical: Metrics.marginVertical / 5,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Metrics.baseMargin
  },
  labelText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: Fonts.size.small,
    marginVertical: 0,
    fontFamily: Fonts.type.base
  },
  eventDate: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: Fonts.size.small,
    marginVertical: 0,
    fontFamily: Fonts.type.base
  },
  blueLabel: {
    backgroundColor: Colors.blue,
  },
  blueLabelText: {
    color: Colors.white,
  },
  redLabel: {
    backgroundColor: Colors.fire,
  },
  difficultyLabel: {
    height: 18,
    backgroundColor: Colors.transparent,
    borderWidth: 0.8,
    borderColor: '#ee4141',
    marginVertical: 0
  },
  difficultyLabelText: {
    color: Colors.fire,
    fontSize: 9
  },
  notStartedLabel: {
    height: 18,
    backgroundColor: Colors.white,
    borderWidth: 0.8,
    borderColor: Colors.lightgrey,
    marginVertical: 0
  },
  notStartedLabelText: {
    color: Colors.lightgrey,
    fontSize: 9
  },
  startedLabel: {
    height: 18,
    backgroundColor: Colors.white,
    borderWidth: 0.8,
    borderColor: Colors.green,
    marginVertical: 0
  },
  startedLabelText: {
    color: Colors.green,
    fontSize: 9
  }
})
