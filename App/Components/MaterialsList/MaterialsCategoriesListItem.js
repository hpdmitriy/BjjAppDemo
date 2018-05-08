import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, View, Image, TouchableNativeFeedback, TouchableHighlight, Platform } from 'react-native'
import styles from './MaterialsListStyles'
import {MEDIA_PATH} from '../../Config/Constants';

class MaterialsCategoriesListItem extends PureComponent {
  static propTypes = {
    onPress: PropTypes.func,
    data: PropTypes.object,
    width: PropTypes.number
  }
  constructor () {
    super()
    this.state = {
      imgUrl: `${MEDIA_PATH}category_icon_default.png`
    }
  }
/*
  async componentWillMount () {
    this.fetchData(this.props.data.id)
  }
  fetchData = async (id) => {
    try {
      const response = await fetch(`${MEDIA_PATH}category_icon_id_${id}.png`)
      console.log(response)
      if(response.ok) {
        this.setState({imgUrl: `${MEDIA_PATH}category_icon_id_${id}.png`})
      }
    } catch (error) {
      console.log(error);
    }
  }
*/
  componentDidMount(){
    const request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        this.setState({imgUrl: `${MEDIA_PATH}category_icon_id_${this.props.data.id}.png`})
      } else {
        console.log('error');
      }
    };

    request.open('GET', `${MEDIA_PATH}category_icon_id_${this.props.data.id}.png`, true);
    request.send();
/*
    return fetch(`${MEDIA_PATH}category_icon_id_${this.props.data.id}.png`)
      .then((response) => {
        if(response.ok) {
          this.setState({imgUrl: `${MEDIA_PATH}category_icon_id_${this.props.data.id}.png`})
        }
      })
      .catch((error) =>{
        console.error(error);
      });
*/
  }
  render () {
    const {data, onPressHandler, width} = this.props
    const {imgUrl} = this.state

    const internals = (
      <View style={[styles.containerCategory, {width: width -20}]}>
        <Image
          source={{uri: imgUrl}}
          style={styles.iconCategory}
        />
        <Text style={styles.nameCategory}>
          {data.name}
        </Text>
      </View>
    )
    if (Platform.OS === 'ios') {
      return (
        <View elevation={5} style={[styles.categoryShadowWrapper]}>
          <TouchableHighlight
            style={styles.touchableRounded}
            onPress={onPressHandler}
            activeOpacity={0.5}
            underlayColor={'#EF1B48'}
          >
            {internals}
          </TouchableHighlight>
        </View>
      )
    } else {
      return (
        <View elevation={5} style={styles.categoryShadowWrapper}>
          <TouchableNativeFeedback
            onPress={onPressHandler}
            background={TouchableNativeFeedback.Ripple('rgba(239,27,82,0.5)', true)}
          >
            {internals}
          </TouchableNativeFeedback>
        </View>
      )
    }
  }
}
export default MaterialsCategoriesListItem
