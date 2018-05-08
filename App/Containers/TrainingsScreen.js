import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Image, TouchableWithoutFeedback, Text } from 'react-native'
import { has, isNil } from 'lodash'
import TrainingsActions from '../Redux/TrainingsRedux'
import Loader from '../Components/Loader'
import I18n from 'react-native-i18n'
import { debugDisplay } from '../Services/ApiHelpers'
import TrainingsList from '../Components/TrainingsList'
import FooterTabs from '../Components/FooterTabs'
import styles from './Styles/TabScreenStyles'
import navStyles from '../Navigation/Styles/NavigationStyles'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'

const leftIco = require('../Images/Icons/left.png')
const noopIco = require('../Images/Icons/noop.png')

class TrainingsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {goBack} = navigation
    return {
      headerTitle: <View style={[navStyles.headerTitleWrap]}>
        <Text style={navStyles.headerTitle}> {I18n.t('trainingsScreenTitle')} </Text>
      </View>,
      headerLeft:<View style={[navStyles.headerLeftButtonWrap]}>
        <TouchableOpacity onPress={() => goBack()}>
        <Image style={[navStyles.headerBackButton]} source={ leftIco }/></TouchableOpacity>
      </View>,
      headerRight: <View style={[navStyles.headerRightButtonWrap]}>
        <TouchableOpacity style={navStyles.headerRightButtonWrap} onPress={() => false}>
          <Image style={navStyles.headerNoopButton} source={ noopIco }/>
        </TouchableOpacity>
      </View>,
    }
  }

  static propTypes = {
    dispatch: PropTypes.func,
    trainings: PropTypes.object,
    navigation: PropTypes.object,
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    const {role, id} = this.props.user.userProfile
    const {token} = this.props.user
    this.props.trainingListRequest(role === 'Student' ? id : null, role !== 'Student' ? id : null, token)
  }

  render () {
    debugDisplay('Trainings Screen', this.props)
    const trainingsList = has(this.props.trainings.trainingsList, 'rows') ? this.props.trainings.trainingsList.rows : []
    return (
      <View style={[styles.grayContainer]}>
        <TrainingsList
          onPress={this.props.navigation.navigate}
          data={trainingsList}
          width={this.props.dimensions.width}
          userProfile={this.props.user.userProfile}
        />
        <FooterTabs
          navigate={this.props.navigation.navigate}
          activeTabScreen={this.props.navigation.state.routeName}
        />
        <Loader
          navFunction={this.props.navigation.navigate}
          operate={['trainings']}
          callRout={this.props.navigation.state.routeName}
        />
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.users,
    trainings: state.trainings,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    trainingListRequest: (studentUserId, teacherUserId, token) => {
      dispatch(TrainingsActions.trainingListRequest(studentUserId, teacherUserId, token))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(TrainingsScreen))
