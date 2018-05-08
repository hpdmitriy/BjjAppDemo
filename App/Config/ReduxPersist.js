import { AsyncStorage } from 'react-native';
import immutablePersistenceTransform from '../Services/ImmutablePersistenceTransform';

//  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '0.2',
  storeConfig: {
    key: 'primary',
    storage: AsyncStorage,
    blacklist: [
      'materials',
      'events'
    ],
    whitelist: [
      'users', 'hashes'
    ],
    transforms: [immutablePersistenceTransform]
  }
};

export default REDUX_PERSIST;
