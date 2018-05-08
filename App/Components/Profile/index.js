import React, {Component} from 'react'
//import { connect } from 'react-redux'
import I18n from 'react-native-i18n'
import PropTypes from 'prop-types'
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import { isNull, isUndefined, isEmpty } from 'lodash'
import RoundButton from '../RoundButton'
import { Colors } from '../../Themes'
import Stats from './Stats'
import FullStats from './FullStats'
import StatsAverage from './StatsAverage'
import profileStyles from '../../Containers/Styles/ProfileScreenStyles'

const profileIco = require('../../Images/Icons/profile.png')

export default class Profile extends Component {

  static contextTypes = {
    dimensions: PropTypes.object
  };
  static propTypes = {
    userProfile: PropTypes.object,
    token: PropTypes.string,
    onPress: PropTypes.func
  }
  static defaultProps = {
    userProfile: null
  }
  constructor(props, context) {
    super(props, context)
    this.state = {
      activeTab: 1,
    }
  }

  render() {
    const {userProfile, token} = this.props
    const {dimensions} = this.context
    if (isNull(userProfile)) return null
    return (
      <View>
        <View style={profileStyles.mainInfo}>
          <View style={[profileStyles.userAvatar]}>
            {
              !isNull(userProfile.photo) ? <Image
                style={[profileStyles.userPhoto]}
                source={{uri: userProfile.photo}}
              /> : <View style={[profileStyles.userNoAvatar]}>
                <Image
                  style={[profileStyles.userNoPhoto]}
                  source={profileIco}
                />
              </View>
            }
          </View>
          <View style={[profileStyles.userInfo]}>
            <Text style={profileStyles.userName}>
              {userProfile.display_name}
              <Text style={profileStyles.userRole}>
                {` (${userProfile.role}) `}
              </Text>
            </Text>
            <Stats role={userProfile.role} uid={userProfile.id}/>
            <RoundButton
              spaced={false}
              dopStyles={{
                backgroundColor: Colors.white,
                borderColor: Colors.grey,
                paddingLeft: 0,
                paddingRight: 0,
                marginHorizontal: 0,
                height: 28,
                borderRadius: 14,
                borderWidth: 0.5,
                marginBottom: 0
              }}
              dopTextStyles={{
                fontSize: 13,
                color: Colors.grey,
                marginVertical: 0
              }}
              onPress={this.props.onPress}
              text={userProfile.role === 'Student' ? I18n.t('chooseTariffTitle') : I18n.t('fundsAccountTitle')}
            />

          </View>
        </View>
        { userProfile.role === 'Student' ? <StatsAverage score={5} percent={10}/> : null }
        { !isNull(userProfile.description) && !isEmpty(userProfile.description) ?
          <View style={profileStyles.userDescriptionBox}>
            <Text style={profileStyles.userDescriptionTitle}>{`About ${userProfile.role}`}</Text>
            <View style={profileStyles.userDescription}>
              <Text style={profileStyles.userDescriptionText}>{userProfile.description}</Text>
            </View>
          </View> : null
        }
        <View style={profileStyles.userDescriptionBox}>
          <Text style={profileStyles.userDescriptionTitle}>{I18n.t('statistic')}</Text>
          <FullStats dimensions={dimensions} role={userProfile.role} uid={userProfile.id}/>
        </View>
      </View>
    )
  }
}


