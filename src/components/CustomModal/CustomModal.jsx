import {Modal, View, TouchableOpacity, Text} from 'react-native';
import {default as modalStyles} from './CustomModal.styles';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';

const CustomModal = ({closeModal, headerText, contentComponent, style}) => {
  const CloseButton = () => {
    return (
      <View style={modalStyles.modal.closeButton}>
        <TouchableOpacity onPress={closeModal}>
          <FeatherIcon name={'x'} color={'white'} size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  const Header = () => {
    return (
      <View style={style.header}>
        <Text style={modalStyles.modal.header}>{headerText}</Text>
      </View>
    );
  };

  const Content = () => {
    return <View style={style.content}>{contentComponent}</View>;
  };

  return (
    <Modal animationType="slide" transparent={true} onRequestClose={closeModal}>
      <View style={modalStyles.modal.container}>
        <View style={[modalStyles.modal.content, style.container]}>
          <CloseButton />
          <Header />
          <Content />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
