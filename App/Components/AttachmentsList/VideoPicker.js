import ImagePicker from 'react-native-image-picker';
import I18n from 'react-native-i18n'

const options = {
  title: 'Select Video',
  chooseFromLibraryButtonTitle: I18n.t('takeVideoFromLibrary'),
  takePhotoButtonTitle: I18n.t('takeVideoFromCamera'),
  mediaType: 'video'
};

const pick = (cb) => {
  ImagePicker.showImagePicker(options, (response) => {
    console.log(response);
    //console.log(mime.lookup(response.path));
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      cb(response);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      cb(response);
    }
  });
};
export default pick;

//response = Object {path: "/storage/emulated/0/DCIM/Camera/VID_20170809_063059.mp4", uri: "content://media/external/video/media/48"}
//
//response = Object {type: "image/jpeg", timestamp: "2017-08-09T10:31:17Z", uri: "content://media/external/images/media/49", data: "/9j/4QFvRXhpZgAATU0AKgAAAAgABwEyAAIAAAAUAAAAYgESAA…KKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Z", originalRotation: 0…}
