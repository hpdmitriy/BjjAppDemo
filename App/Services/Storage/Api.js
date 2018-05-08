import { AsyncStorage } from 'react-native'

const create = () => {
  const userCheckIsLogin = () => {
    return AsyncStorage.getItem('reduxPersist:users')
  }
  const storageGetItem = (key) => {
    return AsyncStorage.getItem(key)
  }
  const storageSetItem = (key, value) => {
    debugger
    AsyncStorage.setItem(key, value)
  }
  const storageRemoveItem = (key) => AsyncStorage.getItem(key)

  return {
    userCheckIsLogin,
    storageGetItem,
    storageRemoveItem,
    storageSetItem
  }
}
export default {
  create
}
