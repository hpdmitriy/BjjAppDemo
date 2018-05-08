import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {ScrollView, Text, View, TouchableOpacity, Image} from 'react-native'
import I18n from 'react-native-i18n'
import {isEmpty, isNil} from 'lodash'
import RoundButton from '../Components/RoundButton'
import UsersActions from '../Redux/UsersRedux'
import {applyLetterSpacing, debugDisplay, decodeToken} from '../Services/ApiHelpers'
import OrientationListenerScreen from '../Decorators/OrientationChangeListener'
import Loader from '../Components/Loader'
import VideoUploader from '../Components/AttachmentsList/VideoUploader'

import styles from './Styles/AttachmentsScreenStyles'
import navStyles from '../Navigation/Styles/NavigationStyles'
const closeIco = require('../Images/Icons/close.png')

class AttachmentsScreen extends Component {
  static navigationOptions = ({navigation}) => {
    const {goBack} = navigation
    return {
      title: null,
      headerStyle: {
        elevation: null,
        shadowOpacity: 0,
      },
      headerLeft: null,
      headerRight: <View style={[navStyles.headerLeftButtonWrap, {marginRight: 5}]}>
        <TouchableOpacity style={[navStyles.headerLeftButtonWrap]} onPress={() => goBack()}>
          <Image style={[navStyles.headerCloseButton, {tintColor: '#ef1b52'}]} source={ closeIco }/></TouchableOpacity>
      </View>
    }
  }


  static propTypes = {
    dispatch: PropTypes.func,
    userGetAuthTokenRequest: PropTypes.func,
    users: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      uploaded: 0,
      progress: 0,
      youtubeProgress: {
        percent: 0,
        uploadedMBytes: 0
      }
    }
  }

  componentWillMount() {
  }



  componentWillReceiveProps(newProps) {
    const {webSocketEvent} = newProps.sockets
    if(webSocketEvent.ev === 'UPLOAD_TO_SERVER_PROGRESS') {
      const {uploaded, progress} = webSocketEvent.d
      if(uploaded && this.state.uploaded !== uploaded) {
        this.setState({uploaded})
      }
      if(progress && this.state.progress !== progress) {
        this.setState({progress})
      }
    }
    if(webSocketEvent.ev === 'YOUTUBE_UPLOAD_PROGRESS') {
      const {percent, uploadedMBytes} = webSocketEvent.d.raw
      if(uploadedMBytes && uploadedMBytes !== this.state.youtubeProgress.uploadedMBytes) {
        this.setState({
          youtubeProgress: Object.assign({}, this.state.youtubeProgress, {uploadedMBytes: uploadedMBytes})
        })
      }
      if(percent && percent !== this.state.youtubeProgress.percent) {
        this.setState({
          youtubeProgress: Object.assign({}, this.state.youtubeProgress, {percent: percent})
        })
      }
    }
  }


  render() {
    debugDisplay('Attachment Screen Props', this.props)
    const {height} = this.props.dimensions
    const {uploaded, progress, youtubeProgress} = this.state
    return (
      <ScrollView style={styles.scrollContainer}
                  contentContainerStyle={styles.scrollContainerContentCenter}>
        <VideoUploader
/*
          cancelHandler={()=>null}
          setAttachmentObject={this.setAttachmentObject}
          getUploadUrl={this.getUploadUrl}
          requestErrors={this.props.attachments.error}
          uploadFileToServer={this.uploadToServer}
          fetching={this.props.attachments.fetching}
          showInputs={!isEmpty(this.props.attachments.attachmentObject)}
*/
        />
        { __DEV__ ? <View>
          <Text style={{color: 'green', fontSize: 14}}>Server uploaded: {uploaded}</Text>
          <Text style={{color: 'red', fontSize: 14}}>Server progress: {progress}</Text>
          <Text style={{color: 'blue', fontSize: 14}}>Youtube percent: {youtubeProgress.percent}</Text>
          <Text style={{color: 'orange', fontSize: 14}}>Youtube Mbytes: {youtubeProgress.uploadedMBytes}</Text>
        </View> : null
        }
        <Loader
          navFunction={this.props.navigation.navigate}
          operate={['attachments']}
          callRout={this.props.navigation.state.routeName}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    attachments: state.attachments,
    sockets: state.sockets
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrientationListenerScreen(AttachmentsScreen))
