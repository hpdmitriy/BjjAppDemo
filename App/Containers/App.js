import React, {Component} from 'react'
import { Provider } from 'react-redux'
import '../Config'
import DebugConfig from '../Config/DebugConfig'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import { CONSOLE_TRON } from '../Config/Constants'

const store = createStore()

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default DebugConfig.useReactotron && CONSOLE_TRON ? console.tron.overlay(App) : App
