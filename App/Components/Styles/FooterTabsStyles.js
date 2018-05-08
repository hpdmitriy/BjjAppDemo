import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/';

export default StyleSheet.create({
  footerTabsContainer: {
    width: '100%',
    justifyContent: 'space-between',
    height: Metrics.paddingDefault * 3,
    paddingHorizontal: Metrics.paddingDefault,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    alignItems: 'center'
  },
  footerTab: {
    height: Metrics.paddingDefault * 3,
    width: Metrics.paddingDefault * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconActive: {
    height: 27,
    resizeMode: 'contain',
    tintColor: Colors.pink
  },
  tabIcon: {
    height: 27,
    resizeMode: 'contain',
    tintColor: Colors.panther
  }
});
