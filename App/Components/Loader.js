import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator, ScrollView } from 'react-native'
import { isNull, isEmpty, assignIn, pick } from 'lodash'
import ErrorView from '../Components/ErrorView'
import SuccessView from '../Components/SuccessView'
import { Colors } from '../Themes/'
import styles from './Styles/LoaderStyles'
import { debugDisplay, getItemsFromProps } from '../Services/ApiHelpers'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'

class Loader extends Component {
  static defaultProps = {
    injectComponent: null,
    awaiting: false,
  }
  static propTypes = {
    navFunction: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.bool
    ]),
    operate: PropTypes.array.isRequired,
    callRout: PropTypes.string,
    awaiting: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.state = {
      LoaderShow: false,
      LoaderFetching: false,
      endFetching: 0,
    }
  }

  componentWillMount () {
    console.log('@@-->Loader Mount ' + this.props.nav.routes[this.props.nav.index].routeName)
    const fetching = getItemsFromProps(this.props.operate, this.props, 'fetching')
    const {LoaderFetching, endFetching} = this.state
    if (!LoaderFetching && fetching && endFetching === 0) {
      return this.setState({
        LoaderShow: true,
        LoaderFetching: fetching,
        endFetching: 'fetching'
      })
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.props.callRout !== this.props.nav.routes[this.props.nav.index].routeName) {
      return
    }

    console.log('@@-->Loader newProps ' + this.props.nav.routes[this.props.nav.index].routeName, this.state)
    const fetching = getItemsFromProps(this.props.operate, newProps, 'fetching')
    const {LoaderFetching, endFetching} = this.state
    if (!LoaderFetching && fetching && endFetching === 0) {
      return this.setState({
        LoaderShow: true,
        LoaderFetching: fetching,
        endFetching: 'fetching'
      })
    }
    if (!LoaderFetching && !fetching && endFetching === 0 && this.props.awaiting) {
      return this.setState({
        LoaderShow: true,
        LoaderFetching: false,
        endFetching: 'awaiting'
      })
    }
    if (LoaderFetching && !fetching && endFetching === 'fetching') {
      return this.setState({
        LoaderShow: true,
        LoaderFetching: false,
        endFetching: 'fetched',
      })
    }
    if (!LoaderFetching && !fetching && endFetching === 'pending') {
      return this.setState({
        LoaderShow: true,
        LoaderFetching: false,
        endFetching: 'pending'
      })
    }
    if (!LoaderFetching && !fetching && endFetching === 'repeat') {
      return this.setState({
        LoaderShow: false,
        LoaderFetching: false,
        endFetching: 0
      })
    }
    if (!LoaderFetching && fetching && endFetching === 'repeat') {
      return this.setState({
        LoaderShow: true,
        LoaderFetching: true,
        endFetching: 'fetching'
      })
    }

  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.props.callRout === this.props.nav.routes[this.props.nav.index].routeName
  }

  componentWillUpdate (nextProps, nextState) {
    console.log('@@-->Loader Update ' + this.props.nav.routes[this.props.nav.index].routeName)
  }

  componentWillUnmount () {
    console.log(this.state)
    console.log('$$$$$--->Loader UnMount ' + this.props.nav.routes[this.props.nav.index].routeName)
    this.setState({
      LoaderShow: false,
      LoaderFetching: false,
      endFetching: 0,
    })
  }

  handleLayout = (evt) => {
    //console.log(this.state.callRout, evt.nativeEvent);
  }

  cancelErrorHandler = ({pending, repeat}) => {
    if (pending) {
      this.setState({
        LoaderShow: true,
        LoaderFetching: false,
        endFetching: 'pending'
      })
    } else if (repeat) {
      this.setState({
        LoaderShow: false,
        LoaderFetching: false,
        endFetching: 'repeat'
      })
    } else {
      this.setState({
        LoaderShow: false,
        LoaderFetching: false,
        endFetching: 0
      })
    }
  }
  cancelSuccessHandler = ({pending, repeat}) => {
    if (pending) {
      this.setState({
        LoaderShow: true,
        LoaderFetching: false,
        endFetching: 'pending'
      })
    } else if (repeat) {
      this.setState({
        LoaderShow: false,
        LoaderFetching: false,
        endFetching: 'repeat'
      })
    } else {
      this.setState({
        LoaderShow: false,
        LoaderFetching: false,
        endFetching: 0,
      }, () => console.log(this.state))
    }
  }
  render () {
    debugDisplay(`${this.props.callRout}: Loader state`, this.state);
    const {
      navFunction,
      injectComponent,
      callRout,
      dimensions
    } = this.props
    if (this.props.nav.routes[this.props.nav.index].routeName !== callRout) return null
    const {LoaderShow, LoaderFetching, endFetching} = this.state
    const fetched = getItemsFromProps(this.props.operate, this.props, 'fetched')
    if (LoaderShow || fetched) {
      return (
        <ScrollView
          style={styles.modalFlexBox}
          contentContainerStyle={styles.modalFlexBoxContentCenter}
        >
          <View onLayout={this.handleLayout} style={styles.modalContainer}>
            { LoaderFetching ? <ActivityIndicator
              animating
              style={{height: 120}}
              size='large'
              color={Colors.pinkMore}
            /> : null
            }
            {
              LoaderFetching ? null : <ErrorView
                callRout={this.props.callRout}
                navigationNavigate={navFunction}
                checkObj={pick(this.props, this.props.operate)}
                operate={this.props.operate}
                cancelHandler={this.cancelErrorHandler.bind(this)}/>
            }
            { LoaderFetching ? null : <SuccessView
              callRout={this.props.callRout}
              navigationNavigate={navFunction}
              checkObj={pick(this.props, this.props.operate)}
              operate={this.props.operate}
              cancelHandler={this.cancelSuccessHandler.bind(this)}/>
            }

            {/*!isNull(injectComponent) ? injectComponent : null*/}
          </View>
        </ScrollView>
      )
    } else {
      return null
    }
  }
}

const mapStateToProps = (state) => (
  {
    users: state.users,
    events: state.events,
    techniques: state.techniques,
    materials: state.materials,
    lessons: state.lessons,
    trainings: state.trainings,
    attachments: state.attachments,
    nav: state.nav
  }
)

const mapDispatchToProps = (dispatch) => (
  {}
)

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(Loader))
//TODO need advanced tested
