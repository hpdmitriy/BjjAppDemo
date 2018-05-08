import { Platform } from 'react-native';
//debugger;
const type = {
  base: Platform.OS === 'ios' ? 'HelveticaNeueCyr-Roman' : 'helvetica_regular',
  light: Platform.OS === 'ios' ? 'HelveticaNeueCyr-Light' : 'helvetica_light',
  bold: Platform.OS === 'ios' ? 'HelveticaNeueCyr-Bold' : 'helvetica_bold',
  emphasis: Platform.OS === 'ios' ? 'HelveticaNeueCyr-Italic' : 'HelveticaNeueCyr-Italic',
  medium: Platform.OS === 'ios' ? 'HelveticaNeueCyr-Medium' : 'helvetica_medium'
};



const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 24,
  h5: 20,
  h6: 19,
  input: 18,
  regular: 16,
  medium: 14,
  small: 12,
  tiny: 8.5
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular,
    color: '#000000'
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
};

export default {
  type,
  size,
  style
};
