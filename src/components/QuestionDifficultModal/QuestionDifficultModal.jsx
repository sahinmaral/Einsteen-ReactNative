import {TouchableOpacity, View, Text} from 'react-native';
import QuestionDifficult from '../../enums/QuestionDifficult';
import {useDispatch, useSelector} from 'react-redux';
import {closeAllModals} from '../../redux/slices/modalSlice';
import CustomModal from '../CustomModal';
import baseStyles from '../../styles/baseStyles';

function QuestionDifficultModal() {
  const {competition} = useSelector(state => state.question);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  const setSelectedDifficult = selectedDifficult => {
    dispatch(setSelectedDifficult(selectedDifficult));
  };

  const Content = () => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => setSelectedDifficult(QuestionDifficult.Any)}
          style={
            competition.selected.difficult === QuestionDifficult.Any &&
            baseStyles.modal.options.container.selected
          }>
          <Text style={baseStyles.modal.options.text.normal}>Any</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedDifficult(QuestionDifficult.Easy)}
          style={
            competition.selected.difficult === QuestionDifficult.Easy &&
            baseStyles.modal.options.container.selected
          }>
          <Text style={baseStyles.modal.options.text.normal}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedDifficult(QuestionDifficult.Medium)}
          style={
            competition.selected.difficult === QuestionDifficult.Medium &&
            baseStyles.modal.options.container.selected
          }>
          <Text style={baseStyles.modal.options.text.normal}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedDifficult(QuestionDifficult.Hard)}
          style={
            competition.selected.difficult === QuestionDifficult.Hard &&
            baseStyles.modal.options.container.selected
          }>
          <Text style={baseStyles.modal.options.text.normal}>Hard</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CustomModal
      closeModal={closeModal}
      headerText={'Select difficult'}
      contentComponent={<Content />}
      style={{
        container: {flex: 0.3},
        header: {flex: 0.2},
        content: {flex: 0.6},
      }}
    />
  );
}

export default QuestionDifficultModal;
