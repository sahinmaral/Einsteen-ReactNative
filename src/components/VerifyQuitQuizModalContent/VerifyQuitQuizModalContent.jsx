import {Modal, View, Text, TouchableOpacity} from 'react-native';
import styles from './VerifyQuitQuizModalContent.styles';
import theme from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import { closeAllModals } from '../../redux/slices/modalSlice';
import { useDispatch } from 'react-redux';

function VerifyQuitQuizModalContent() {
  const navigation = useNavigation();

  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  return (
    <Modal animationType="slide" transparent={true} onRequestClose={closeModal}>
      <View style={styles.modal.container}>
        <View style={styles.modal.content}>
          <Text style={styles.modal.header}>
            Are you sure you want to quit quiz ?
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={[
                styles.modal.options.container.normal,
                {backgroundColor: theme.colors.lightGreen},
              ]}
              onPress={() => {
                closeModal()
                navigation.navigate("Homepage")
              }}>
              <Text style={styles.modal.options.text.normal}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modal.options.container.normal,
                {backgroundColor: theme.colors.lightRed},
              ]}
              onPress={closeModal}>
              <Text style={styles.modal.options.text.normal}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default VerifyQuitQuizModalContent;
