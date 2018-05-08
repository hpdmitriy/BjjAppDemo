import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Image, TouchableWithoutFeedback, Text } from 'react-native'
import { has, isNil } from 'lodash'
import TechniquesActions from '../Redux/TechniquesRedux'
import Loader from '../Components/Loader'
import I18n from 'react-native-i18n'
import { debugDisplay } from '../Services/ApiHelpers'
import TechniquesList from '../Components/TechniquesList'
import FooterTabs from '../Components/FooterTabs'
import styles from './Styles/TabScreenStyles'
import navStyles from '../Navigation/Styles/NavigationStyles'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'

const leftIco = require('../Images/Icons/left.png')
const noopIco = require('../Images/Icons/noop.png')

class TechniquesScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {goBack} = navigation
    return {
      headerTitle: <View style={[navStyles.headerTitleWrap]}>
        <Text style={navStyles.headerTitle}> {I18n.t('techniquesScreenTitle')} </Text>
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
    techniques: PropTypes.object,
    token: PropTypes.string,
    navigation: PropTypes.object,
    techniqueCategoryListRequest: PropTypes.func,
    techniqueCategoryChange: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    this.props.techniqueCategoryListRequest(this.props.token)
  }

  goToTechnique = (id, name) => {
    this.props.techniqueCategoryChange(id, name)
    return this.props.navigation.navigate('LessonsScreen', {id: id, title: name})
  }

  render () {
    debugDisplay('Techniques Screen', this.props)
    const techniquesList = has(this.props.techniques.techniquesList, 'rows') ? this.props.techniques.techniquesList.rows : []
    return (
      <View style={[styles.grayContainer]}>
        <TechniquesList
          onPress={this.goToTechnique}
          data={techniquesList}
          width={this.props.dimensions.width}
        />
        <FooterTabs
          navigate={this.props.navigation.navigate}
          activeTabScreen={this.props.navigation.state.routeName}
        />
        <Loader
          navFunction={this.props.navigation.navigate}
          operate={['techniques']}
          callRout={this.props.navigation.state.routeName}
        />
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    techniques: state.techniques,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    techniqueCategoryListRequest: (token) => {
      dispatch(TechniquesActions.techniqueCategoryListRequest(token))
    },
    techniqueCategoryChange: (id, name) => {
      dispatch(TechniquesActions.techniqueCategoryChange(id, name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(TechniquesScreen))
