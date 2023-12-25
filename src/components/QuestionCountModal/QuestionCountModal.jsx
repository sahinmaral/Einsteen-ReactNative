import {TouchableOpacity, View, Text, useWindowDimensions} from 'react-native';
import makeBaseStyles from '../../styles/baseStyles';
import {useDispatch, useSelector} from 'react-redux';
import {closeAllModals} from '../../redux/slices/modalSlice';
import CustomModal from '../CustomModal';

function QuestionCountModal() {
  const {competition} = useSelector(state => state.question);

  const dispatch = useDispatch();

  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  const setSelectedQuestionCount = selectedQuestionCount => {
    dispatch(setSelectedQuestionCount(selectedQuestionCount));
  };

  const Content = () => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => setSelectedQuestionCount(10)}
          style={
            competition.selected.questionCount === 10
              ? baseStyles.modal.options.container.selected
              : null
          }>
          <Text style={baseStyles.modal.options.text.normal}>10</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedQuestionCount(20)}
          style={
            competition.selected.questionCount === 20
              ? baseStyles.modal.options.container.selected
              : null
          }>
          <Text style={baseStyles.modal.options.text.normal}>20</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedQuestionCount(30)}
          style={
            competition.selected.questionCount === 30
              ? baseStyles.modal.options.container.selected
              : null
          }>
          <Text style={baseStyles.modal.options.text.normal}>30</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedQuestionCount(40)}
          style={
            competition.selected.questionCount === 40
              ? baseStyles.modal.options.container.selected
              : null
          }>
          <Text style={baseStyles.modal.options.text.normal}>40</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedQuestionCount(50)}
          style={
            competition.selected.questionCount === 50
              ? baseStyles.modal.options.container.selected
              : null
          }>
          <Text style={baseStyles.modal.options.text.normal}>50</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CustomModal
      closeModal={closeModal}
      headerText={'Select question count'}
      contentComponent={<Content />}
      style={{
        container: {flex: 0.4},
        header: {flex: 0.2},
        content: {flex: 0.6},
      }}
    />
  );
}

export default QuestionCountModal;
