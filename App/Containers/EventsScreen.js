import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { has, isNil } from 'lodash'
import EventsActions from '../Redux/EventsRedux'
import Loader from '../Components/Loader'
import I18n from 'react-native-i18n'
import { debugDisplay, quickSearch } from '../Services/ApiHelpers'
import EventsCustomizer from '../Components/EventsCustomizer'
import SearchBar from '../Components/SearchBar'
import EventsList from '../Components/EventsList'
import FooterTabs from '../Components/FooterTabs'
import styles from './Styles/TabScreenStyles'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'
import navStyles from '../Navigation/Styles/NavigationStyles'

const closeIco = require('../Images/Icons/close.png');
const customizeIco = require('../Images/Icons/customize.png');
const searchIco = require('../Images/Icons/search.png');

class EventsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {state} = navigation
    const showSearch = has(state.params, 'showSearch')
    return {
      headerTitle: <View style={[navStyles.headerTitleWrap]}>
        <Text style={navStyles.headerTitle}> {I18n.t('eventsScreenTitle')} </Text>
      </View>,
      headerLeft: <View style={navStyles.headerLeftButtonWrap}>
        <TouchableOpacity onPress={showSearch ? state.params.onPressCustomize : null}>
          <Image
            style={navStyles.headerCustomizeButton}
            source={ customizeIco }
          />
        </TouchableOpacity>
      </View>,
      headerRight: <View style={[navStyles.headerRightButtonWrap]}>
        <TouchableOpacity onPress={showSearch ? state.params.onPressSearch : null}>
          <Image
            style={navStyles.headerSearchButton}
            source={ showSearch && state.params.showSearch ? closeIco : searchIco}
          />
        </TouchableOpacity>
      </View>,
    }
  }

  static propTypes = {
    dispatch: PropTypes.func,
    events: PropTypes.object,
    users: PropTypes.object,
    navigation: PropTypes.object,
    eventListRequest: PropTypes.func,
  }
  constructor (props) {
    super(props)
    this.state = {
      showCustomizer: false,
      showSearch: false,
      searchWords: null,
      checkedCategory: []
    }
  }

  componentWillMount () {
    this.props.eventListRequest(this.props.users.token, 100)
    const {showSearch} = this.state
    this.props.navigation.setParams({
      onPressSearch: this.onPressSearch,
      onPressCustomize: this.onPressCustomize,
      showSearch: showSearch
    })
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
  onPressCustomize = () => {
    const {showCustomizer} = this.state
    this.setState({
      showCustomizer: !showCustomizer,
    })
  }
  searchHandler = (val) => {
    this.setState({
      searchWords: val
    })
  }
  customizeHandler = (val) => {
    const checkedCategory = new Set(this.state.checkedCategory)
    checkedCategory.has(val) ? checkedCategory.delete(val) : checkedCategory.add(val)
    return this.setState({
      checkedCategory: [...checkedCategory]
    })
  }
  render () {
    debugDisplay('Events Screen', this.props)
    const {searchWords, showCustomizer, checkedCategory, showSearch} = this.state
    const eventsList = has(this.props.events.eventsList, 'rows') ? this.props.events.eventsList.rows : null
    return (
      <View style={[styles.grayContainer]}>
        <SearchBar
          visible={showSearch}
          onSearch={ this.searchHandler }
          onCancel={ () => console.log('onCancel')}
          searchTerm={this.state.searchWords}
        />
        <EventsList
          style={showSearch ? {paddingBottom: 100} : {paddingBottom:50}}
          onPress={this.props.navigation.navigate}
          data={quickSearch(eventsList, searchWords, checkedCategory)}/>
        <FooterTabs
          navigate={this.props.navigation.navigate}
          activeTabScreen={this.props.navigation.state.routeName}
        />
        <EventsCustomizer
          data={quickSearch(eventsList, searchWords, [], true)}
          activeCategory={checkedCategory}
          onPress={this.customizeHandler}
          show={showCustomizer}
          closeHandler={this.onPressCustomize}
          dimensions={this.props.dimensions}
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
    users: state.users,
    events: state.events,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    eventListRequest: (token, limit) => {
      dispatch(EventsActions.eventListRequest(token, limit))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(EventsScreen))
