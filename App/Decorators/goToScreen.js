import React, { PureComponent as ReactComponent } from 'react'
import PropTypes from 'prop-types'
export default (OriginalButton) => class GoToScreenButton extends ReactComponent {
  static defaultProps = {
    navigator: false,
    navigate: false,
    navigatorParams: undefined
  }
  static propTypes = {
    navigator: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    navigatorParams: PropTypes.oneOfType([PropTypes.oneOf([undefined]), PropTypes.object]),
    navigate: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ])
  }

  constructor (props) {
    super(props)
    this.state = {
      pressed: null,
    }
  }

  goToScreen = () => {
    this.props.navigate(this.props.navigator, this.props.navigatorParams)
  }

  render () {
    if (!this.props.navigator && !this.props.navigate) {
      return (<OriginalButton {...this.props}/>)
    } else {
      const newProps = Object.assign({}, this.props, {onPress: this.goToScreen})
      return (<OriginalButton {...newProps} />)
    }
  }

};
