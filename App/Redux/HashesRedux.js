import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  getHashes: null,
  cleanHashes: null,
  setHashes: ['hashes']
})
export const HashesTypes = Types
export default Creators
export const INITIAL_STATE = Immutable({
  usedHashes: []
})

export const reducerSetHashes = (state, {hashes}) => {
  return state.merge({usedHashes: [...hashes]})
}
export const reducerCleanHashes = (state, {hashes}) => {
  return state.merge({...INITIAL_STATE})
}
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.SET_HASHES]: reducerSetHashes,
    [Types.CLEAN_HASHES]: reducerCleanHashes
  }
)
