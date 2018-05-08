import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Image,Text } from 'react-native'
import { has, isNil } from 'lodash'
import MaterialsActions from '../Redux/MaterialsRedux'
import Loader from '../Components/Loader'
import { debugDisplay, quickSearch } from '../Services/ApiHelpers'
import SearchBar from '../Components/SearchBar'
import FooterTabs from '../Components/FooterTabs'
import styles from './Styles/TabScreenStyles'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'
import OneMaterialsCategory from '../Components/MaterialsList/OneMaterialsCategory'
import navStyles from '../Navigation/Styles/NavigationStyles'

const closeIco = require('../Images/Icons/close.png');
const leftIco = require('../Images/Icons/left.png')
const searchIco = require('../Images/Icons/search.png');

class OneMaterialCategoryScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {state, goBack} = navigation
    const showSearch = has(state.params, 'showSearch')
    return {
      headerTitle: <View style={[navStyles.headerTitleWrap]}>
        <Text style={navStyles.headerTitle}> {state.params.title} </Text>
      </View>,
      headerLeft:<View style={[navStyles.headerLeftButtonWrap]}>
        <TouchableOpacity onPress={()=>goBack()}>
          <Image style={[navStyles.headerBackButton]} source={ leftIco }/></TouchableOpacity>
      </View>,
      headerRight: <View style={[navStyles.headerRightButtonWrap]}>
        <TouchableOpacity style={navStyles.headerRightButtonWrap} onPress={showSearch ? state.params.onPressSearch : ()=>null}>
          <Image
            style={styles.headerSearchButton}
            source={ showSearch && state.params.showSearch ? closeIco : searchIco}
          />
        </TouchableOpacity>
      </View>,
    }
  }

  static propTypes = {
    dispatch: PropTypes.func,
    token: PropTypes.string,
    navigation: PropTypes.object,
    materialListRequest: PropTypes.func,
  }
  constructor (props) {
    super(props)
    this.state = {
      showSearch: false,
      searchWords: null,
    }
  }

  componentDidMount () {
    this.props.materialListRequest(this.props.navigation.state.params.id, this.props.token)
    const {showSearch} = this.state
    this.props.navigation.setParams({
      onPressSearch: this.onPressSearch,
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
  searchHandler = (val) => {
    this.setState({
      searchWords: val
    })
  }
  render () {
    debugDisplay('Material Category Screen', this.props)
    const {searchWords, showSearch} = this.state
    const materialsList = has(this.props.materialsList, 'rows') ? this.props.materialsList.rows : null
    return (
      <View style={[styles.grayContainer]}>
        <SearchBar
          visible={showSearch}
          onSearch={ this.searchHandler }
          onCancel={ () => console.log('onCancel')}
          searchTerm={this.state.searchWords}
        />
        <OneMaterialsCategory
          style={showSearch ? {paddingBottom: 100} : {paddingBottom:50}}
          onPress={this.props.navigation.navigate}
          data={quickSearch(materialsList, searchWords, [])}/>
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
    token: state.users.token,
    materialsList: state.materials.materialsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    materialListRequest: (activeCategory, token, limit, status, accessTags, include) => {
      dispatch(MaterialsActions.materialListRequest(activeCategory, token, limit, status, accessTags, include));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(OneMaterialCategoryScreen))
