import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Text,
  View
} from 'react-native';
import styles from './Styles/InputTextStyles';

class InputText extends PureComponent {
  static propTypes = {
    refer: PropTypes.func,
    submitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    secure: PropTypes.bool,
    showDecor: PropTypes.bool,
    styleMod: PropTypes.string,
    hotUpdate: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.func]),
    multiline: PropTypes.bool,
    autoGrow: PropTypes.bool,
    maxHeight: PropTypes.number,

  };
  static defaultProps = {
    secure: false,
    showDecor: true,
    submitEditing: () => null,
    styleMod: '',
    hotUpdate: null,
    multiline: false,
    autoGrow: false,
    maxHeight: 40
  }
  constructor(props) {
    super(props);
    this.state = {
      focus: false,
      blur: false,
      value: this.props.value || ''
    }
  }
  handleChangeTextInput = (value) => {
    const {hotUpdate} = this.props
    this.setState({value});
    if(hotUpdate !== null) {
      hotUpdate(value)
    }
  }
  clearValue = () => {
    this.setState({value: ''});
  }

  focusTextInput = () => {
    this.setState({focus: true})
  }
  blurTextInput = () => {
    this.setState({focus: false})
  }

  render() {
    const {refer, submitEditing, placeholder, secure, showDecor, styleMod, multiline, autoGrow, maxHeight, dopStyles} = this.props
    const {value} = this.state
    const inputStyles = placeholder === '0000' ?
      styles.textInputConfirm : styleMod.length ? styles[styleMod] : styles.textInput
    return (
      <View>
      <TextInput
        ref={refer}
        placeholderTextColor='#a0a0a0'
        style={[inputStyles, dopStyles]}
        value={value}
        editable={true}
        keyboardType='default'
        returnKeyType='next'
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={this.handleChangeTextInput}
        underlineColorAndroid='transparent'
        onSubmitEditing={submitEditing}
        placeholder={placeholder}
        onFocus={this.focusTextInput}
        onBlur={this.blurTextInput}
        secureTextEntry={secure}
        multiline={multiline}
        autoGrow={autoGrow}
        maxHeight={maxHeight}
      />
        {showDecor ?
          <Text style={[styles.inputDecor, this.state.focus ? styles.inputDecorFocus : '']}/> :
          null
        }

      </View>
    );
  }
}

export default InputText;
