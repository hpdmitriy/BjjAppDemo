import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View, Alert, Text} from 'react-native'
import * as mime from 'react-native-mime-types'
import I18n from 'react-native-i18n'
import { takeRight, toUpper, isNull } from 'lodash'
import RoundButton from '../RoundButton'
import { debugDisplay } from '../../Services/ApiHelpers'
import InputText from '../InputText'
import pick from './VideoPicker'
import AttachmentsActions from '../../Redux/AttachmentsRedux'
import WebSocketActions from '../../Redux/WebSocketRedux'

import styles from './UploadersStyles'
import { Metrics, Colors, Fonts } from '../../Themes'

class VideoUploader extends Component {
  static propTypes = {
    attachmentGetUploadUrlRequest: PropTypes.func,
    attachmentUploadToServerRequest: PropTypes.func,
  }
  static defaultProps = {}

  constructor (props) {
    super(props)

    this.state = {
      videoObject: {
        path: null,
        uri: null
      },
      mimeType: null,
      error: null
    }
  }

  componentWillReceiveProps (newProps) {
  }

  componentWillUpdate (nextProps, nextState) {
    if ((this.state.videoObject.path !== nextState.videoObject.path) ||
      (this.state.videoObject.uri !== nextState.videoObject.uri)) {
      return this.props.attachmentGetUploadUrlRequest(nextState.mimeType, this.props.user.token)
    }
  }

  pickerHandler = () => {
    pick((data) => {
        if (data.error) {
          return this.setState({error: data.error})
        }
        if (data.path) {
          return this.setState({
            mimeType: mime.lookup(data.path),
            videoObject: data
          })
        }
      }
    )
  }

  uploadHandler = () => {
    const videoTitle = this.textInputVideoTitle.props.value
    const videoComment = this.textInputVideoComment.props.value
    const {attachmentUrl} = this.props.attachments
    const {videoObject} = this.state
    const options = Object.assign({}, attachmentUrl, {title: videoTitle, comment: videoComment})
    if(videoComment !== '' && videoTitle !== '') {
      return this.props.attachmentUploadToServerRequest(options, videoObject, this.props.emitWebSocketRequest)
    } else {
      return Alert.alert(
        I18n.t('invalidParamsTitle'),
        I18n.t('invalidParamsMessage'),
        [
          {
            text: 'OK',
            onPress: () => null,
            style: {color: "#f11c1d"}
          },
        ],
        {cancelable: true}
      );
    }

  }

  render () {
    debugDisplay('Chat Screen', this.state)
    const videoName = isNull(this.state.videoObject.path) ? null : takeRight(this.state.videoObject.path.split('/'))[0]
    const {attachmentUrl} = this.props.attachments
    const videoConditions = videoName !== null && attachmentUrl !== null
    return (
      <View style={[styles.form]}>
        <View style={[styles.row, {alignItems: 'center'}]}>
          <Text style={styles.title}>{ toUpper(I18n.t('sendVideoEvaluation')) }</Text>
          {  videoConditions ? <Text style={styles.message}>Your video: {videoName}</Text> : <Text style={styles.message}>Max size 50Mb</Text>  }
          <RoundButton
            ref={(submitForm) => { this.submitButton = submitForm }}
            spaced
            dopStyles={{
              backgroundColor: Colors.white,
              paddingLeft: Metrics.doubleBaseMargin,
              paddingRight: Metrics.doubleBaseMargin,
              marginHorizontal: Metrics.doubleBaseMargin,
              marginTop: Metrics.doubleBaseMargin,
              height: Metrics.doubleSection,
            }} dopTextStyles={{
            color: Colors.pinkMore
          }}
            onPress={this.pickerHandler}
            text={I18n.t('chooseVideo')}
          />
        </View>
        {  videoConditions ? <View style={[styles.row, {alignItems: 'center'}]}>
          <Text style={styles.inputSmallLabel}>{I18n.t('sendVideoTitle')}</Text>
          <InputText
            placeholder=''
            value={videoName}
            refer={(inputVideoTitle) => { this.textInputVideoTitle = inputVideoTitle }}
            submitEditing={() => null}
            dopStyles={{paddingHorizontal: 20, marginTop: 10}}
          />
          <Text style={styles.inputSmallLabel}>{I18n.t('videoComment')}</Text>
          <InputText
            placeholder=''
            value={I18n.t('sendVideoComment')}
            multiline
            refer={(inputVideoComment) => { this.textInputVideoComment = inputVideoComment }}
            submitEditing={() => null}
            maxHeight={120}
            autoGrow
            dopStyles={{paddingHorizontal: 20, marginTop: 10}}
          />
          <RoundButton
            ref={(submitForm) => { this.submitButton = submitForm }}
            spaced
            dopStyles={{
              marginTop: Metrics.baseMargin * 2,
              marginBottom: 0,
              paddingLeft: Metrics.baseMargin * 2,
              paddingRight: Metrics.baseMargin * 2,
              marginHorizontal: Metrics.baseMargin,
              height: Metrics.doubleSection,
              alignSelf: 'center'
            }}
            dopTextStyles={{
              marginVertical: Metrics.doubleBaseMargin,
            }}
            onPress={this.uploadHandler}
            text={I18n.t('sendVideo')}
          />
        </View> : null
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.users,
    trainings: state.trainings,
    attachments: state.attachments,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attachmentGetUploadUrlRequest: (mimeType, token) => {
      dispatch(
        AttachmentsActions.attachmentGetUploadUrlRequest(mimeType, token)
      )
    },
    attachmentUploadToServerRequest: (options, data, cb) => {
      dispatch(
        AttachmentsActions.attachmentUploadToServerRequest(options, data, cb)
      );
    },
    emitWebSocketRequest: (event) => {
      dispatch(
        WebSocketActions.emitWebSocketRequest(event)
      );
    }
    /*
     trainingGetByIdRequest: (trainingId, ignoreMark, token) => {
     dispatch(
     TechniquesActions.trainingGetByIdRequest(trainingId, ignoreMark, token)
     );
     },
     lessonCloseTrainingRequest: (trainingId, include, token) => {
     dispatch(
     TechniquesActions.lessonCloseTrainingRequest(trainingId, include, token)
     );
     },
     trainingSendMessageRequest: (trainingId, text, token) => {
     dispatch(
     TechniquesActions.trainingSendMessageRequest(trainingId, text, token)
     );
     },


     },
     */
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoUploader)
