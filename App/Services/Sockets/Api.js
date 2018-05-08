import socketCluster from 'socketcluster-client'
import { HOST_NAME, SOCKET_PORT } from '../../Config/Constants'

export default class wsApi {
  constructor (options, token) {
    this.initialize(token)
    this.options = options
  }

  initialize (userToken) {
    this.socket = socketCluster.connect({
      hostname: HOST_NAME,
      secure: true,
      port: SOCKET_PORT,
      rejectUnauthorized: false,
      authEngine: {
        _internalStorage: {
          userToken: userToken
        },
        loadToken: function (name, callback) {
          const token = this._internalStorage[name] // eslint-disable-line no-underscore-dangle
            || null
          callback(null, token)
        },
        removeToken: function (name, callback) {
          let token
          this.loadToken(name, (err, authToken) => {
            token = authToken
          })
          delete this._internalStorage[name] // eslint-disable-line no-underscore-dangle
          callback && callback(null, token) // eslint-disable-line no-unused-expressions
        }
      },
      authTokenName: 'userToken',
    })
    this.requestId = 0
    this.cbs = {}
    const $this = this
    this.socket.on('error', err => {
      throw new Error(`Socket Error - ${err}`)
    })

    this.socket.on('response', data => {
      //console.log('OnResponse', data);
      if (!data.id || !{}.hasOwnProperty.call(this.cbs, data.id)) return
      const fn = this.cbs[data.id]
      delete this.cbs[data.id]
      fn(data.error, data.data)
    })

    this.socket.on('connect', () => {
      if (typeof this.options.onConnect === 'function') {
        this.options.onConnect(this)
      }
    })

    this.socket.on('authenticate', data => {
      this.userChannelName = `u${this.socket.authToken.uid}`
      console.log('Channel >>> ', this.userChannelName)
      if (!this.userChannel) {
        this.userChannel = this.subscribe(this.userChannelName, channelData => {
          if (typeof this.options.onEvent === 'function') {
            this.options.onEvent(channelData.ev, channelData, this)
          }
        }, err => {
          console.error('Error while subscribe to user event channel', err)
        })
      }
    })
    this.socket.on('deauthenticate', data => {
      console.log('Channel >>> ', 'deauthenticate')
      if (this.userChannel) {
        this.userChannel.unsubscribe()
        this.userChannel = null
        if (typeof this.options.onDisConnect === 'function') {
          this.options.onDisConnect(this)
        }
      }
    })
  }

  sendCommand (command, params, cb) {
    const req = {id: ++this.requestId, command, params: params || {}}
    this.cbs[req.id] = cb
    this.socket.emit('command', req)
  }

  subscribe (channelName, onMsg, onFail) {
    const channel = this.socket.subscribe(channelName)
    if (typeof onMsg === 'function') {
      channel.watch(onMsg)
    }
    if (typeof onFail === 'function') {
      channel.on('subscribeFail', onFail)
    }
    return channel
  }
}
