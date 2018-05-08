import React, {Component} from 'react'
import * as ReactNavigation from 'react-navigation'
import { BackHandler } from "react-native";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'

class ReduxNavigation extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    nav: PropTypes.object,
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(ReactNavigation.NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props
    const navigation = ReactNavigation.addNavigationHelpers({
      dispatch,
      state: nav
    })

    return <AppNavigation navigation={navigation} />;
  }
}
const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
