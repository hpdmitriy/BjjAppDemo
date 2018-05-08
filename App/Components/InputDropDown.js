import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import ModalDropdown from 'react-native-modal-dropdown';
import styles from './Styles/InputDropDownStyles';

class InputDropDown extends PureComponent {
  static propTypes = {
    refer: PropTypes.func,
    opts: PropTypes.array,
    selectedIndex: PropTypes.number,
    selectedValue: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selectedValue,
    }
  }
  handleSelect = (id, val) =>  {
    this.setState({ selected: val });
  }


  render() {
    const {refer, opts, selectedIndex, selectedValue} = this.props
    return (
      <ModalDropdown
        ref={refer}
        textStyle={styles.rowLabel}
        options={opts}
        defaultIndex={selectedIndex}
        defaultValue={selectedValue}
        dropdownStyle={[styles.dropDownBox, { height: opts.length * 42 }]}
        dropdownTextStyle={styles.dropDownText}
        onSelect={this.handleSelect}
      />
    );
  }
}

export default InputDropDown;
