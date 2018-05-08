import { Dimensions } from 'react-native';

const msp = (dim, limit) => {
  return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit;
};

const isPortrait = () => {
  const dim = Dimensions.get('window');
  return dim.height >= dim.width;
};
const getDimensions = () => Dimensions.get('window');

const isLandscape = () => {
  const dim = Dimensions.get('window');
  return dim.width >= dim.height;
};

const isTablet = () => {
  const dim = Dimensions.get('window');
  return ((dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900)));
};

const isPhone = () => !isTablet();

export default {
  isPortrait,
  isLandscape,
  isTablet,
  isPhone,
  getDimensions
};
