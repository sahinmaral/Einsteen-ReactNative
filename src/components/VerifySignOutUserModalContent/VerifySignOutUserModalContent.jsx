import React from 'react';
import {TouchableOpacity, View, Text, Modal} from 'react-native';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import styles from './VerifySignOutUserModalContent.styles';
import {useToast} from 'react-native-toast-notifications';
import auth from '@react-native-firebase/auth';
import theme from '../../styles/theme';

function VerifySignOutUserModalContent({closeAllModals}) {
  const toast = useToast();

  const signOutUser = async () => {
    try {
      await auth().signOut();

      toast.show('You successfully signed out', {
        type: 'success',
        placement: 'top',
      });
    } catch (error) {
      toast.show(JSON.stringify(error), {
        type: 'warning',
        placement: 'top',
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={closeAllModals}>
      <View style={styles.modal.container}>
        <View style={styles.modal.content}>
          <View style={styles.modal.closeButton}>
            <TouchableOpacity onPress={closeAllModals}>
              <FeatherIcon name={'x'} color={'white'} size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modal.header}>
            Are you sure you want to sign out ?
          </Text>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={signOutUser}
              style={[
                styles.modal.options.container,
                {backgroundColor: theme.colors.lightGreen},
              ]}>
              <Text style={styles.modal.options.text.normal}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={closeAllModals}
              style={[
                styles.modal.options.container,
                {backgroundColor: theme.colors.lightRed},
              ]}>
              <Text style={styles.modal.options.text.normal}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default VerifySignOutUserModalContent;
