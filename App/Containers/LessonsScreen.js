import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { has, isNil, truncate} from 'lodash'
import LessonsActions from '../Redux/LessonsRedux'
import Loader from '../Components/Loader'
import I18n from 'react-native-i18n'
import { debugDisplay, quickSearch } from '../Services/ApiHelpers'
import LessonCategoryNav from '../Components/LessonsList/LessonCategoryNav'
import LessonsList from '../Components/LessonsList'
import FooterTabs from '../Components/FooterTabs'
import styles from './Styles/TabScreenStyles'
import navStyles from '../Navigation/Styles/NavigationStyles'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'

const customizeIco = require('../Images/Icons/customize.png');
const bookIco = require('../Images/Icons/boockmarck.png');
const upIco = require('../Images/Icons/up.png');
const downIco = require('../Images/Icons/down.png');
const leftIco = require('../Images/Icons/left.png')

class LessonsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {state, goBack} = navigation
    const screenTitle = has(state.params, 'title')
    const showCategoryNav = has(state.params, 'showCategoryNav');
    const showOnlyFavorites = has(state.params, 'showOnlyFavorites');
    const onPressOnlyFavorites = has(state.params, 'onPressOnlyFavorites');
    return {
      headerTitle: <View style={[navStyles.headerTitleWrap]}>
        <TouchableOpacity onPress={showCategoryNav ? state.params.onPressShowCategoryNav : () => null}>
          <Text style={navStyles.headerTitle}> {screenTitle ? state.params.title : I18n.t('lessonsScreenTitle')} &nbsp;
            <Image
              style={[navStyles.headerDownButton]}
              source={ downIco }
            /></Text>
        </TouchableOpacity>
      </View>,
/*
      headerLeft:<View style={[navStyles.headerLeftButtonWrap]}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image style={[navStyles.headerCustomizeButton]}  source={ customizeIco }/>
        </TouchableOpacity>
      </View>,
*/
      headerLeft:<View style={[navStyles.headerLeftButtonWrap]}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image style={[navStyles.headerBackButton]} source={ leftIco }/></TouchableOpacity>
      </View>,
      headerRight: <View style={[navStyles.headerRightButtonWrap]}>
        <TouchableOpacity style={navStyles.headerRightButtonWrap} onPress={onPressOnlyFavorites ? state.params.onPressOnlyFavorites : () => null}>
          <Image style={[navStyles.headerBookutton,{tintColor: showOnlyFavorites && state.params.showOnlyFavorites ? 'yellow' : 'white'}]} source={ bookIco }/>
        </TouchableOpacity>
      </View>,
    }
  }

  static propTypes = {
    dispatch: PropTypes.func,
    lessons: PropTypes.object,
    activeTechnique: PropTypes.object,
    token: PropTypes.string,
    navigation: PropTypes.object,
    lessonGetListRequest: PropTypes.func,
  }
  constructor (props) {
    super(props)
    this.state = {
      showCategoryNav: false,
      showSearch: false,
      showOnlyFavorites: false
    }
  }

  componentWillMount () {
    this.props.lessonGetListRequest(null, this.props.users.token)
    this.props.navigation.setParams({
      showOnlyFavorites: this.state.showOnlyFavorites,
      onPressOnlyFavorites: this.onPressOnlyFavorites,
      showCategoryNav: this.state.showCategoryNav,
      onPressShowCategoryNav: this.onPressShowCategoryNav,
      //showCustomizer: this.state.showCustomizer
    });
/*
    this.props.eventListRequest(this.props.users.token, 100)
    const {showSearch} = this.state
    this.props.navigation.setParams({
      onPressSearch: this.onPressSearch,
      onPressCustomize: this.onPressCustomize,
      showSearch: showSearch
    })
*/
  }

  onPressSearch = () => {
    const {showSearch} = this.state
    const {navigation} = this.props
    navigation.setParams({
      showSearch: !showSearch
    })
    this.setState({
      showSearch: !showSearch
    })
  }
  onPressShowCategoryNav = () => {
    const {showCategoryNav} = this.state
    this.setState({
      showCategoryNav: !showCategoryNav,
    })
  }
  onPressOnlyFavorites = () => {
    const {showOnlyFavorites} = this.state
    const {navigation} = this.props
    navigation.setParams({
      showOnlyFavorites: !showOnlyFavorites
    })
    this.setState({
      showOnlyFavorites: !showOnlyFavorites,
    })
  }
  categoryNavHandler = (id, title) => {
    this.props.navigation.setParams({
      showOnlyFavorites: false
    })
    this.setState({
      showOnlyFavorites: false,
    })
    this.props.navigation.navigate('LessonsScreen',{id:id, title:title})
  }
  render () {
    debugDisplay('Lessons Screen', this.props)
    const {showCategoryNav, showOnlyFavorites} = this.state
    const {activeTechnique, techniquesList} = this.props
    const lessonsList = has(this.props.lessons.lessonList, 'rows') ? this.props.lessons.lessonList.rows : null
    return (
      <View style={[styles.grayContainer]}>
        <LessonsList
          userProfile={this.props.users}
          onPress={this.props.navigation.navigate}
          data={quickSearch(lessonsList, null, [this.props.navigation.state.params.id], false, showOnlyFavorites ? this.props.users.userProfile.id : 0)}/>
        <FooterTabs
          navigate={this.props.navigation.navigate}
          activeTabScreen={'TechniquesScreen'}
        />
        <LessonCategoryNav
          data={techniquesList.rows}
          activeCategory={this.props.navigation.state.params.id}
          onPress={this.categoryNavHandler}
          show={showCategoryNav}
          closeHandler={this.onPressShowCategoryNav}
          dimensions={this.props.dimensions}
        />
        <Loader
          navFunction={this.props.navigation.navigate}
          operate={['lessons']}
          callRout={this.props.navigation.state.routeName}
        />

      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
    lessons: state.lessons,
    techniquesList: state.techniques.techniquesList,
    activeTechnique: state.techniques.activeTechnique
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    lessonGetListRequest: (activeCategory, token) => {
      dispatch(LessonsActions.lessonGetListRequest(activeCategory, token))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(LessonsScreen))
