import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableWithoutFeedback, Image, Alert } from 'react-native'
import I18n from 'react-native-i18n'
import { Colors } from '../Themes/'

const setFavoriteFlag = (favoritesToggle) => {
  Alert.alert(
    I18n.t('toFavoritesTitle'),
    I18n.t('toFavoritesMessage'),
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: {color: Colors.pink}},
      {
        text: 'OK',
        onPress: favoritesToggle,
        style: {color: Colors.fire}
      }
    ],
    {cancelable: false}
  )
}

const bookIco = require('../Images/Icons/boockmarck.png')
export default function BoockMarck (props) {
  return (
    <TouchableWithoutFeedback
      onPress={() => setFavoriteFlag(props.onPress)}
    >
      <View>
        <Image
          source={bookIco}
          style={{
            tintColor: props.isFavorites ? Colors.fire : Colors.grey,
            width: 30 / 2.3,
            height: 40 / 2.3
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
BoockMarck.propTypes = {
  onPress: PropTypes.func,
  isFavorites: PropTypes.number
}
