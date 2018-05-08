import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  paddingDefault: 15,
  section: 25,
  baseMargin: 10,
  bigMargin: 30,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  searchBarHeight: 30,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  lineHeight: width < height ? width / 25 : height / 25,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
};

export default metrics;
