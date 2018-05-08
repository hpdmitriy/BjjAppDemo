import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent
  },
  containerTrainingWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    width: Metrics.screenWidth,
    height: 100,
  },
  containerTraining: {
    borderRadius: 20,
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    paddingVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.paddingDefault,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.lightgrey
  },
  textRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  title: {
    fontFamily: Fonts.type.light,
    color: Colors.text,
    fontSize: Fonts.size.regular - 1
  },
  owner: {
    fontFamily: Fonts.type.light,
    color: Colors.text,
    fontSize: Fonts.size.small - 2
  },
  trainingAttributes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  training_NOT_STARTED_style: {
    borderColor: Colors.lightgrey,
    backgroundColor: Colors.white,
    color: Colors.lightgrey
  },
  training_STARTED_style: {
    borderColor: Colors.green,
    backgroundColor: Colors.white,
    color: Colors.green
  },
  training_NO_TEACHERS_style: {
    borderColor: Colors.black,
    backgroundColor: Colors.white,
    color: Colors.black
  },
  training_AWAITING_style: {
    borderColor: Colors.fire,
    backgroundColor: Colors.white,
    color: Colors.fire
  },
  training_MARKED_style: {
    borderColor: Colors.blue,
    backgroundColor: Colors.white,
    color: Colors.blue
  },
  training_DENIED_style: {
    borderColor: Colors.fire,
    backgroundColor: Colors.fire,
    color: Colors.white
  },
  training_DONE_style: {
    borderColor: Colors.green,
    backgroundColor: Colors.green,
    color: Colors.white
  },
  trainingMessageWrapLeft: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: Metrics.paddingDefault,
    marginVertical: Metrics.baseMargin

  },
  trainingMessageWrapRight: {
    backgroundColor: Colors.transparent,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingHorizontal: Metrics.paddingDefault,
    marginVertical: Metrics.baseMargin
  },
  trainingMessageAvatar: {
    width: 36,
    height: 36,
    backgroundColor: Colors.pink,
    borderRadius: 18,
    justifyContent: 'center',
  },
  iconProfile: {
    width: 30,
    height: 30,
    tintColor: Colors.white,
    alignSelf: 'center'
  },
  trainingMessageText: {
    width: Metrics.screenWidth - (Metrics.paddingDefault * 2) - 55,
  },
  trainingMessageTextMsgWrap: {
    borderRadius: Metrics.baseMargin,
    paddingTop: Metrics.smallMargin,
    paddingBottom: Metrics.smallMargin + 2,
    paddingHorizontal: Metrics.paddingDefault,
    backgroundColor: 'rgba(216,216,216,0.6)'
  },
  trainingMessageTextMsg: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.medium,
    textAlign: 'left',
    lineHeight: 18,
    color: Colors.coal

  },
  trainingMessageTextDate: {
    color: '#7a7a7a',
    fontSize: Fonts.size.small - 2,
    marginTop: Metrics.smallMargin
  }
})
