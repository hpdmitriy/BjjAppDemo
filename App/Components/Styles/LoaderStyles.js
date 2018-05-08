import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes/';

export default StyleSheet.create({
  modalBox: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    transform: [{
      'translate': [0, 0, 1]
    }]
  },
  modalFlexBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.8)',
    transform: [{
      'translate': [0, 0, 1]
    }],
    flex: 1,
    width: '100%',
    height: '100%'
  },
  modalFlexBoxContentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    width: 30 * Metrics.baseMargin,
    minHeight: 20 * Metrics.baseMargin,
    backgroundColor: Colors.white,
    borderRadius: Metrics.baseMargin,
    padding: Metrics.baseMargin * 2
  },
  title: {
    paddingBottom: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.medium,
    fontSize: Fonts.size.input,
    color: Colors.text
  },
  message: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
    textAlign: 'center',
    fontFamily: Fonts.type.base,
    lineHeight: Fonts.size.medium * 1.5,
    fontSize: Fonts.size.medium,
    color: Colors.charcoal
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
