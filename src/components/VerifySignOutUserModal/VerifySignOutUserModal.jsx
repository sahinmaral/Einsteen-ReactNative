import {TouchableOpacity, View, Text} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import theme from '../../styles/theme';
import {closeAllModals} from '../../redux/slices/modalSlice';
import {useDispatch} from 'react-redux';
import {
  getCurrentUser,
  googleSignOut,
} from '../../services/firebase/AuthService';
import CustomModal from '../CustomModal';
import baseStyles from '../../styles/baseStyles';

function VerifySignOutUserModalContent() {
  const toast = useToast();

  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const currentUser = getCurrentUser();

      if (currentUser) {
        const providerIdWhichUserSignedIn =
          currentUser.providerData[0].providerId;

        if (providerIdWhichUserSignedIn === 'google.com') {
          await googleSignOut();
        }

        await signOut();

        dispatch(closeAllModals());

        toast.show('You successfully signed out', {
          type: 'success',
          placement: 'top',
        });
      }
    } catch (error) {
      toast.show(JSON.stringify(error), {
        type: 'warning',
        placement: 'top',
      });
    }
  };

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  const Content = () => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            paddingHorizontal: 20,
            borderRadius: 5,
            backgroundColor: theme.colors.lightGreen,
          }}>
          <Text style={baseStyles.modal.options.text.normal}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={closeAllModals}
          style={{
            paddingHorizontal: 20,
            borderRadius: 5,
            backgroundColor: theme.colors.lightRed,
          }}>
          <Text style={baseStyles.modal.options.text.normal}>No</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CustomModal
      closeModal={closeModal}
      headerText={'Are you sure you want to sign out ?'}
      contentComponent={<Content />}
      style={{
        container: {flex: 0.2},
        header: {flex: 0.8},
        content: {flex: 0.6},
      }}
    />
  );
}

export default VerifySignOutUserModalContent;
