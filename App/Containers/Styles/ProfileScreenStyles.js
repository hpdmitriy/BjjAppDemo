import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, ApplicationStyles} from '../../Themes';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.silver
  },
  grayContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundGray,

  },
  mainInfo: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingVertical: Metrics.paddingDefault,
    margin: Metrics.paddingDefault,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    borderRadius: 24,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 5
  },
  userAvatar: {
    marginLeft: Metrics.paddingDefault
  },
  userNoAvatar: {
    width: 90,
    padding: 10,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.pink,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userPhoto: {
    width: 90,
    height: 90,
    borderRadius: 45
  },
  userNoPhoto: {
    width: 80,
    height: 80,
    tintColor: Colors.white,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: Metrics.paddingDefault,
    paddingRight: Metrics.paddingDefault,
    paddingTop: 5,
  },
  userName: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.regular,
    color: Colors.text
  },
  userRole: {
    fontFamily: Fonts.type.light,
    fontSize: Fonts.size.medium,
    color: '#a1a1a1'
  },
  userDescriptionBox: {
    marginHorizontal: Metrics.paddingDefault,
    marginTop: 5,
  },
  userDescription: {
    padding: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    marginVertical: Metrics.doubleBaseMargin,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    borderRadius: 24,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    elevation: 5
  },
  userDescriptionTitle: {
    flexDirection: 'row',
    fontFamily: Fonts.type.light,
    color: Colors.lightgrey,
    alignSelf: 'flex-start',
    paddingHorizontal: Metrics.doubleBaseMargin,
    fontSize: Fonts.size.regular
  },
  userDescriptionText: {
    fontFamily: Fonts.type.light,
    color: Colors.text,
    fontSize: Fonts.size.small,
    lineHeight: Fonts.size.small + 4
  },
  roundedButtonText: {
    fontSize: 13,
    color: Colors.gray,
    marginVertical: 0
  },
  roundedButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey,
    paddingLeft: 0,
    paddingRight: 0,
    marginHorizontal: 0,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom:0
  }

});
