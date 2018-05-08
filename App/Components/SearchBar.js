import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import InputText from '../Components/InputText';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {SearchBarEventsStyles as styles} from './Styles/SearchBarStyles';
import I18n from 'react-native-i18n';

class SearchBar extends React.Component {


  static propTypes = {
    onSearch: PropTypes.func,
    onCancel: PropTypes.func,
    searchTerm: PropTypes.string,
    visible: PropTypes.bool,
  };

  render() {
    const { onSearch, onCancel, searchTerm, visible } = this.props;
    const onSubmitEditing = () => {
      return onSearch(searchTerm)};
    if (visible) {
      return (
        <View style={styles.container}>
          <InputText
            placeholder={I18n.t('searchPlaceHolder')}
            refer={(inputSearch) => { this.textInputSearch = inputSearch; }}
            submitEditing={onSubmitEditing}
            value={searchTerm}
            showDecor={false}
            styleMod={'searchInput'}
            hotUpdate={onSearch}
          />

          {/*<Icon name='search' size={Metrics.icons.tiny} style={styles.searchIcon} />*/}
{/*
          <TextInput
            ref='searchText'
            autoFocus
            placeholder='Search...'
            placeholderTextColor={Colors.grey}
            underlineColorAndroid='transparent'
            style={styles.searchInput}
            value={this.props.searchTerm}
            onChangeText={onSearch}
            autoCapitalize='none'
            onSubmitEditing={onSubmitEditing}
            returnKeyType={'search'}
            autoCorrect={false}
            selectionColor={Colors.snow}
          />
*/}
          {/*<TouchableOpacity onPress={onCancel} style={styles.cancelButton}>*/}
          {/*<Text style={styles.buttonLabel}>Cancel</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
      );
    } else {
      return null;
    }
  }
}

export default SearchBar;
