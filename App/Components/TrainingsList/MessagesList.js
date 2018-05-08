import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {FlatList} from 'react-native'
import styles from './TrainingsListStyles'
import * as Animatable from 'react-native-animatable'
import MessagesListItem from './MessagesListItem'
import {orderBy} from 'lodash'
import BackgroundImage from '../../Components/BackgroundImage'

const chatBg = require('../../Images/fixture/chat-bg.png');

export default class MessagesList extends PureComponent {
/*  state = {
    rendered: false
  }*/

  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  }

  static defaultProps = {
    data: [],
  }


  render() {
    const {data, userId} = this.props
    if (data === null || data.messages === null || data.messages.length === 0) {
      return null
    } else {
      return (
        <Animatable.View
          style={{paddingBottom: 50}}
          animation='fadeIn'
          iterationCount={1}
        >

          <FlatList
            style={{backgroundColor: 'rgba(255,255,255,0)'}}
            onContentSizeChange={() => this.flatListRef.scrollToEnd({animated: true})}
            onLayout={() => this.flatListRef.scrollToEnd({animated: true})}
            ref={(ref) => {
              this.flatListRef = ref
            }}
            contentContainerStyle={{alignItems: 'flex-start', backgroundColor: 'rgba(255,255,255,0)'}}
            data={orderBy(data.messages, 'id', 'asc')}
            keyExtractor={(item) => {
              return item.id
            }}
            renderItem={({item, index}) => {
              return (
                <MessagesListItem
                  data={item}
                  rowId={index}
                  userId={userId}
                  mark={{markReasonMessage: data.mark_reason_message, markReasonMessageId: data.mark_reason_message_id}}
                />)
            }}
          />
        </Animatable.View>
      )
    }
  }
}

