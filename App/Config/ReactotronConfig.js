import Immutable from 'seamless-immutable';
import Reactotron from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import Config from './DebugConfig';

if (Config.useReactotron) {
  // https://github.com/infinitered/reactotron for more options!
  Reactotron
    .configure({ name: 'Bjj4All App' })
    .useReactNative()
    .use(reduxPlugin({
      onRestore: Immutable
    }))
    .use(sagaPlugin())
    .connect();
  Reactotron.clear();

  console.tron = Reactotron;
}
