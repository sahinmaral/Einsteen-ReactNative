import {View, Text, TouchableOpacity, useWindowDimensions} from 'react-native';
import theme from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';
import {closeAllModals} from '../../redux/slices/modalSlice';
import {useDispatch} from 'react-redux';
import CustomModal from '../CustomModal';
import makeBaseStyles from '../../styles/baseStyles';

function VerifyQuitQuizModal() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  const Content = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            borderRadius: 5,
            backgroundColor: theme.colors.lightGreen,
          }}
          onPress={() => {
            closeModal();
            navigation.navigate('Homepage');
          }}>
          <Text style={baseStyles.modal.options.text.normal}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 20,
            borderRadius: 5,
            backgroundColor: theme.colors.lightRed,
          }}
          onPress={closeModal}>
          <Text style={baseStyles.modal.options.text.normal}>No</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CustomModal
      closeModal={closeModal}
      headerText={'Are you sure you want to quit quiz ?'}
      contentComponent={<Content />}
      style={{
        container: {flex: 0.2},
        header: {flex: 0.5},
        content: {flex: 0.4},
      }}
    />
  );
}

export default VerifyQuitQuizModal;
