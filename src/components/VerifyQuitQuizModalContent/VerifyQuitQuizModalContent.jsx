import {Modal, View, Text, TouchableOpacity} from 'react-native';
import styles from './VerifyQuitQuizModalContent.styles';
import theme from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';

function VerifyQuitQuizModalContent({modalVisible, toggleModal,quitQuiz}) {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}>
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
                navigation.goBack();
              }}>
              <Text style={styles.modal.options.text.normal}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modal.options.container.normal,
                {backgroundColor: theme.colors.lightRed},
              ]}
              onPress={toggleModal}>
              <Text style={styles.modal.options.text.normal}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default VerifyQuitQuizModalContent;
