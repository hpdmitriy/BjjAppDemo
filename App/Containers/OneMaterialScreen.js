import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { has } from 'lodash'
import I18n from 'react-native-i18n'
import MaterialsActions from '../Redux/MaterialsRedux'
import { debugDisplay} from '../Services/ApiHelpers'
import Loader from '../Components/Loader'
import OneMaterial from '../Components/MaterialsList/OneMaterial'
import FooterTabs from '../Components/FooterTabs'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'
import styles from './Styles/TabScreenStyles'
import navStyles from '../Navigation/Styles/NavigationStyles'

const leftIco = require('../Images/Icons/left.png')
const noopIco = require('../Images/Icons/noop.png')

class OneMaterialScreen extends PureComponent {
  static navigationOptions = ({navigation}) => {
    const {state, goBack} = navigation
    const screenTitle = has(state.params, 'title')
    return {
      headerTitle: <View style={[navStyles.headerTitleWrap]}>
        <Text style={navStyles.headerTitle}> {screenTitle ? state.params.title : I18n.t('materialsScreenTitle')} </Text>
      </View>,
      headerLeft:<View style={[navStyles.headerLeftButtonWrap]}>
        <TouchableOpacity onPress={()=>goBack()}>
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
    users: PropTypes.object,
    materialGetByIdRequest: PropTypes.func
  }

  componentWillMount () {

    /*    const dataSource = findLessonData(
     this.props.events.eventsList.rows,
     this.props.navigation.state.params.id
     );
     this.setState({
     dataSource: dataSource
     });*/
    this.props.materialGetByIdRequest(this.props.navigation.state.params.id, this.props.users.token)
  }

  render () {
    debugDisplay('oneLesson Screen', this.props)
    return (
      <View style={[styles.grayContainer]}>
        <OneMaterial
          orientation={this.props.orientation}
          dimensions={this.props.dimensions}
          data={this.props.materials.currentMaterial}
          user={this.props.users}
          navigate={this.props.navigation.navigate}
        />
        <FooterTabs
          navigate={this.props.navigation.navigate}
          activeTabScreen={'MaterialsScreen'}
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
    materials: state.materials,
    token: state.users.token,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    materialGetByIdRequest: (id, token) => {
      dispatch(MaterialsActions.materialGetByIdRequest(id, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(OneMaterialScreen))
