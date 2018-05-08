import React, {PureComponent as ReactComponent} from 'react';
import {Dimensions} from 'react-native';
import Platform from '../Controllers/OrientationController';

export default (OriginalScreen) => class OrientationListnerScreen extends ReactComponent {
  static navigationOptions = OriginalScreen.navigationOptions
  constructor(props) {
    super(props);
    this.state = {
      orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
      deviceType: Platform.isTablet() ? 'tablet' : 'phone',
      dimensions: Platform.getDimensions()
    };
  }
  changeScreenOrientation = () => {
    this.setState({
      orientation: Platform.isPortrait() ? 'portrait' : 'landscape',
      deviceType: Platform.isTablet() ? 'tablet' : 'phone',
      dimensions: Platform.getDimensions()
    });
  }
  componentDidMount() {
    Dimensions.addEventListener('change', this.changeScreenOrientation);
  }
  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.changeScreenOrientation);
  }


  render() {
    const {orientation, deviceType, dimensions} = this.state;
      return (<OriginalScreen {...this.props} orientation={orientation} deviceType={deviceType} dimensions={dimensions}  />);
  }
};
