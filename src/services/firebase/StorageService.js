import storage from '@react-native-firebase/storage';

const getStorageReferenceByPath = path => {
  return storage().ref(path);
};

const putFileByPhotoURL = (reference, url) => {
  return reference.putFile(url);
};

const uploadPhoto = reference => {
  return reference.getDownloadURL();
};

export {getStorageReferenceByPath, putFileByPhotoURL,uploadPhoto};
