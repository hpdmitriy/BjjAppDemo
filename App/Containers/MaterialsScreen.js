import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { has, isNil } from 'lodash'
import MaterialsActions from '../Redux/MaterialsRedux';
import Loader from '../Components/Loader'
import I18n from 'react-native-i18n'
import { debugDisplay } from '../Services/ApiHelpers'
import MaterialsList from '../Components/MaterialsList'
import FooterTabs from '../Components/FooterTabs'
import styles from './Styles/TabScreenStyles'
import navStyles from '../Navigation/Styles/NavigationStyles'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'

const leftIco = require('../Images/Icons/left.png')
const noopIco = require('../Images/Icons/noop.png')

class MaterialsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {goBack} = navigation
    return {
      headerTitle: <View style={[navStyles.headerTitleWrap]}>
        <Text style={navStyles.headerTitle}> {I18n.t('materialsScreenTitle')} </Text>
      </View>,
      headerLeft:<View style={[navStyles.headerLeftButtonWrap]}>
        <TouchableOpacity onPress={()=>goBack()}>
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
    token: PropTypes.string,
    navigation: PropTypes.object,
    categoryListRequest: PropTypes.func,
  }
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount () {
    this.props.categoryListRequest('Material', this.props.token);
  }

  render () {
    debugDisplay('Materials Screen', this.props)
    const categoriesList = has(this.props.materials.categoryesList, 'rows') ? this.props.materials.categoryesList.rows : []
    return (
      <View style={[styles.grayContainer]}>
        <MaterialsList
          onPress={this.props.navigation.navigate}
          data={categoriesList}
          width={this.props.dimensions.width}
        />
        <FooterTabs
          navigate={this.props.navigation.navigate}
          activeTabScreen={this.props.navigation.state.routeName}
        />
        <Loader
          navFunction={this.props.navigation.navigate}
          operate={['materials']}
          callRout={this.props.navigation.state.routeName}
        />
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    materials: state.materials,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    categoryListRequest: (entityName, token) => {
      dispatch(MaterialsActions.categoryListRequest(entityName, token));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(MaterialsScreen))
