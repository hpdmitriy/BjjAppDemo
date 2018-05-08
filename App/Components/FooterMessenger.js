import React, { Component } from 'react'
import { connect } from 'react-redux'
import TrainingsActions from '../Redux/TrainingsRedux'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, View, Image, StyleSheet } from 'react-native'
import InputText from '../Components/InputText'
import styles from '../Components/Styles/FooterMessengerStyles'
import I18n from 'react-native-i18n'

const sendIco = require('../Images/Icons/send.png')

class FooterMessenger extends Component {
  static propTypes = {
    trainingId: PropTypes.number,
    trainingSendMessageRequest: PropTypes.func
  }

  constructor (props) {
    super(props)
    this.state = {}
  }
  componentDidMount () {
    this.textInputComment.focus()
  }

  handleSendMessage = () => {
    const {trainingId, token} = this.props
    //this.props.onCancelPress()
    const comment = this.textInputComment.props.value
    if (comment === '') return
    this.props.trainingSendMessageRequest(trainingId,comment, token )
    this.textInputComment.clear()
    this.textInputComment._layoutHeight = 40
    //this.props.onPress(score, comment)
    //this.props.onCancelPress()
  }

  render () {
    const dopInputStyle = StyleSheet.flatten(styles.textInput)
    return (
      <View style={styles.container}>
        <InputText
          showDecor={false}
          multiline
          refer={(inputComment) => { this.textInputComment = inputComment }}
          submitEditing={() => null}
          maxHeight={120}
          autoGrow
          dopStyles={[dopInputStyle, {width: this.props.dimensions.width - 70}]}
        />
        <TouchableWithoutFeedback
          style={styles.footerTab}
          onPress={this.handleSendMessage}
        >
          <Image
            source={sendIco}
            style={styles.tabIcon}
          />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const mapStateToProps = (state) => (
  {
    token: state.users.token,
  }
)

const mapDispatchToProps = (dispatch) => (
  {
    trainingSendMessageRequest: (id, text, token) => {
      dispatch(TrainingsActions.trainingSendMessageRequest(id, text, token))
    },
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(FooterMessenger)


