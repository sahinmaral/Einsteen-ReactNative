import React, {useState} from 'react';
import {TouchableOpacity, View, Text, Modal} from 'react-native';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import styles from './UpdateProfilePhotoModalContent.styles';
import {useDispatch, useSelector} from 'react-redux';
import {closeAllModals} from '../../redux/slices/modalSlice';
import theme from '../../styles/theme';
import {launchImageLibrary} from 'react-native-image-picker';
import {useToast} from 'react-native-toast-notifications';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import {setUser} from '../../redux/slices/authSlice';
import firestore from '@react-native-firebase/firestore';

function UpdateProfilePhotoModalContent() {
  const dispatch = useDispatch();
  const toast = useToast();

  const {user} = useSelector(state => state.auth);

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [photoProcessFetch, setPhotoProcessFetch] = useState({
    isPhotoUploading: false,
    isPhotoDeleting: false,
  });

  const loadingIndicatorOfUploading = useLoadingIndicator(
    photoProcessFetch.isPhotoUploading,
  );

  const loadingIndicatorOfDeleting = useLoadingIndicator(
    photoProcessFetch.isPhotoDeleting,
  );

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  const deleteSelectedPhoto = () => {
    setSelectedPhoto(null);
  };

  const deletePhoto = async () => {
    const reference = storage().ref(`images/${user.id}`);

    try {
      if (!user.photoURL) throw "You haven't uploaded any profile thumbnail.";

      setPhotoProcessFetch({photoProcessFetch, isPhotoDeleting: true});

      await reference.delete();

      var currentUser = auth().currentUser;

      await currentUser.updateProfile({
        photoURL: null,
      });

      var usersRef = firestore().collection('users');

      const updateObject = {};
      updateObject['photoURL'] = firestore.FieldValue.delete();

      await usersRef.doc(currentUser.uid).update(updateObject);

      dispatch(
        setUser({
          ...user,
          photoURL: null,
        }),
      );

      setPhotoProcessFetch({photoProcessFetch, isPhotoDeleting: false});

      toast.show('You deleted profile photo successfully', {
        type: 'success',
        placement: 'top',
      });
    } catch (error) {
      setPhotoProcessFetch({photoProcessFetch, isPhotoDeleting: false});

      toast.show(error, {
        type: 'warning',
        placement: 'top',
      });
    }
  };

  const selectPhoto = async () => {
    let options = {
      storageOptions: {
        path: 'image',
      },
    };

    launchImageLibrary(options, response => {
      if (response.error) {
        toast.show(
          'Error during selecting profile photo. Please try again later.',
          {
            type: 'warning',
            placement: 'top',
          },
        );
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        let imageType = response.type || response.assets?.[0]?.type;
        let imageFileName = response.fileName || response.assets?.[0]?.fileName;
        let imageName = response.fileName || response.assets?.[0]?.fileName;

        setSelectedPhoto({
          uri: imageUri,
          type: imageType,
          fileName: imageFileName,
          name: imageName,
        });
      }
    });
  };

  const uploadProfilePhoto = async () => {
    setPhotoProcessFetch({photoProcessFetch, isPhotoUploading: true});

    const reference = storage().ref(`images/${user.id}`);

    try {
      await reference.putFile(selectedPhoto.uri);

      const downloadURL = await reference.getDownloadURL();

      var currentUser = auth().currentUser;

      await currentUser.updateProfile({
        photoURL: downloadURL,
      });

      var usersRef = firestore().collection('users');

      const updateObject = {};
      updateObject['photoURL'] = downloadURL;

      await usersRef.doc(currentUser.uid).update(updateObject);

      dispatch(
        setUser({
          ...user,
          photoURL: downloadURL,
        }),
      );

      setPhotoProcessFetch({photoProcessFetch, isPhotoUploading: false});

      setSelectedPhoto(null);

      toast.show('You uploaded new profile photo successfully', {
        type: 'success',
        placement: 'top',
      });
    } catch (error) {
      setPhotoProcessFetch({photoProcessFetch, isPhotoUploading: false});

      toast.show(
        'Error during uploading profile photo. Please try again later.',
        {
          type: 'warning',
          placement: 'top',
        },
      );
    }
  };

  return (
    <Modal animationType="slide" transparent={true} onRequestClose={closeModal}>
      <View style={styles.modal.container}>
        <View style={styles.modal.content}>
          <View style={styles.modal.closeButton}>
            <TouchableOpacity onPress={closeModal}>
              <FeatherIcon name={'x'} color={'white'} size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modal.header}>Update Profile Photo</Text>

          <View style={styles.modal.buttonGroup.container}>
            {!selectedPhoto ? (
              <TouchableOpacity
                onPress={selectPhoto}
                style={styles.modal.buttonGroup.selectPhotoButton.container}>
                <Text
                  style={[
                    styles.modal.buttonGroup.optionButton.text,
                    {color: theme.colors.white},
                  ]}>
                  Select Photo
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                  onPress={uploadProfilePhoto}
                  disabled={photoProcessFetch.isPhotoUploading}
                  style={[
                    styles.modal.buttonGroup.uploadPhotoButton.container,
                    {
                      justifyContent: `${
                        photoProcessFetch.isPhotoUploading
                          ? 'center'
                          : 'flex-start'
                      }`,
                    },
                  ]}>
                  <Text style={styles.modal.buttonGroup.optionButton.text}>
                    Upload Photo
                  </Text>
                  {photoProcessFetch.isPhotoUploading && (
                    <View
                      style={{
                        transform: [
                          {
                            rotate: `${loadingIndicatorOfUploading.rotation}deg`,
                          },
                        ],
                      }}>
                      <FeatherIcon name="rotate-cw" color={'white'} size={24} />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={deleteSelectedPhoto}
                  style={
                    styles.modal.buttonGroup.deleteSelectedPhotoButton.container
                  }>
                  <Text style={styles.modal.buttonGroup.optionButton.text}>
                    Delete Selected Photo
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              onPress={deletePhoto}
              disabled={photoProcessFetch.isPhotoDeleting}
              style={[
                styles.modal.buttonGroup.optionButton.container,
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: 10,
                },
              ]}>
              <Text style={styles.modal.buttonGroup.optionButton.text}>
                Delete Photo
              </Text>
              {photoProcessFetch.isPhotoDeleting && (
                <View
                  style={{
                    transform: [
                      {
                        rotate: `${loadingIndicatorOfDeleting.rotation}deg`,
                      },
                    ],
                  }}>
                  <FeatherIcon name="rotate-cw" color={'black'} size={24} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default UpdateProfilePhotoModalContent;
