import {TouchableOpacity, View, Text} from 'react-native';
import {closeAllModals} from '../../redux/slices/modalSlice';
import {useDispatch, useSelector} from 'react-redux';
import {setUserSelectedScoreFilter} from '../../redux/slices/authSlice';
import uuid from 'react-native-uuid';
import baseStyles from '../../styles/baseStyles';
import CustomModal from '../CustomModal';

function FilterScoresByQuestionCountModal() {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  const setSelectedQuestionCount = selectedQuestionCount => {
    dispatch(
      setUserSelectedScoreFilter({
        ...user.scores.filter.selected,
        questionCount: selectedQuestionCount,
      }),
    );
  };

  const Content = () => {
    return (
      <View>
        {user.scores.filter.sections.questionCount.map(questionCount => {
          return (
            <TouchableOpacity
              key={uuid.v4()}
              onPress={() => setSelectedQuestionCount(questionCount)}
              style={
                user.scores.filter.selected.questionCount !== null &&
                user.scores.filter.selected.questionCount === questionCount &&
                baseStyles.modal.options.container.selected
              }>
              <Text style={baseStyles.modal.options.text.normal}>
                {questionCount}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          key={uuid.v4()}
          onPress={() => setSelectedQuestionCount(null)}
          style={
            user.scores.filter.selected.questionCount === null &&
            baseStyles.modal.options.container.selected
          }>
          <Text style={baseStyles.modal.options.text.normal}>Any</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CustomModal
      closeModal={closeModal}
      headerText={'Select question count to filter'}
      contentComponent={<Content />}
      style={{
        container: {flex: 0.3},
        header: {flex: 0.2},
        content: {flex: 0.6},
      }}
    />
  );
}

export default FilterScoresByQuestionCountModal;
