import {TouchableOpacity, View, Text, useWindowDimensions} from 'react-native';
import QuestionDifficult from '../../enums/QuestionDifficult';
import makeBaseStyles from '../../styles/baseStyles';
import {closeAllModals} from '../../redux/slices/modalSlice';
import {useDispatch, useSelector} from 'react-redux';
import {setUserSelectedScoreFilter} from '../../redux/slices/authSlice';
import uuid from 'react-native-uuid';
import CustomModal from '../CustomModal';

function FilterScoresByQuestionDifficultModal() {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  const setSelectedDifficult = selectedDifficult => {
    dispatch(
      setUserSelectedScoreFilter({
        ...user.scores.filter.selected,
        difficult: selectedDifficult,
      }),
    );
  };

  const Content = () => {
    return (
      <View style={{flex: 1}}>
        {user.scores.filter.sections.difficult
          .filter(difficult => difficult !== QuestionDifficult.Any)
          .map(difficult => {
            return (
              <TouchableOpacity
                key={uuid.v4()}
                onPress={() =>
                  setSelectedDifficult(QuestionDifficult[difficult])
                }
                style={
                  user.scores.filter.selected.difficult !== null &&
                  user.scores.filter.selected.difficult ===
                    QuestionDifficult[difficult] &&
                  baseStyles.modal.options.container.selected
                }>
                <Text style={baseStyles.modal.options.text.normal}>
                  {difficult}
                </Text>
              </TouchableOpacity>
            );
          })}
        <TouchableOpacity
          key={uuid.v4()}
          onPress={() => setSelectedDifficult(QuestionDifficult.Any)}
          style={
            user.scores.filter.selected.difficult === QuestionDifficult.Any &&
            baseStyles.modal.options.container.selected
          }>
          <Text style={baseStyles.modal.options.text.normal}>
            {QuestionDifficult.Any}
          </Text>
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

export default FilterScoresByQuestionDifficultModal;
