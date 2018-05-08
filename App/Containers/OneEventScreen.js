import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { has } from 'lodash'
import EventsActions from '../Redux/EventsRedux'
import { debugDisplay} from '../Services/ApiHelpers'
import Loader from '../Components/Loader'
import OneEvent from '../Components/EventsList/OneEvent'
import FooterTabs from '../Components/FooterTabs'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'

import styles from './Styles/TabScreenStyles'
import navStyles from '../Navigation/Styles/NavigationStyles'

const leftIco = require('../Images/Icons/left.png')
const noopIco = require('../Images/Icons/noop.png')

class OneEventScreen extends PureComponent {
  static navigationOptions = ({navigation}) => {
    const {state, goBack} = navigation
    const screenTitle = has(state.params, 'title')
    return {
      headerTitle: <View style={[navStyles.headerTitleWrap]}>
        <Text style={navStyles.headerTitle}> {screenTitle ? state.params.title : 'Event'} </Text>
      </View>,
      headerLeft: <View style={[navStyles.headerLeftButtonWrap]}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image style={[navStyles.headerBackButton]} source={ leftIco }/></TouchableOpacity>
      </View>,
      headerRight: <View style={[navStyles.headerRightButtonWrap]}>
        <TouchableOpacity style={navStyles.headerRightButtonWrap} onPress={() => false}>
          <Image style={navStyles.headerNoopButton} source={ noopIco }/>
        </TouchableOpacity>
      </View>
    }
  }

  static propTypes = {
    dispatch: PropTypes.func,
    events: PropTypes.object,
    users: PropTypes.object,
    eventGetByIdRequest: PropTypes.func
  }

  componentWillMount () {
    this.props.eventGetByIdRequest(this.props.navigation.state.params.id, this.props.users.token)
  }

  render () {
    debugDisplay('oneEvent Screen', this.props)
    return (
      <View style={[styles.grayContainer]}>
        <OneEvent
          orientation={this.props.orientation}
          dimensions={this.props.dimensions}
          data={this.props.events.currentEvent}
          user={this.props.users}
          navigate={this.props.navigation.navigate}
        />
        <FooterTabs
          navigate={this.props.navigation.navigate}
          activeTabScreen={'EventsScreen'}
        />
        <Loader
          navFunction={this.props.navigation.navigate}
          operate={['events']}
          callRout={this.props.navigation.state.routeName}
        />
      </View>
    )

  }
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    eventGetByIdRequest: (id, token) => {
      dispatch(EventsActions.eventGetByIdRequest(id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(OneEventScreen))
