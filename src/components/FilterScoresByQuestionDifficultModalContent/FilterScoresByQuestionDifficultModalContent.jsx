import React from 'react';
import {TouchableOpacity, View, Text, Modal} from 'react-native';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import QuestionDifficult from '../../enums/QuestionDifficult';
import styles from './FilterScoresByQuestionDifficultModalContent.styles';
import {closeAllModals} from '../../redux/slices/modalSlice';
import {useDispatch, useSelector} from 'react-redux';
import {setUserSelectedScoreFilter} from '../../redux/slices/authSlice';
import uuid from 'react-native-uuid';

function FilterScoresByQuestionDifficultModalContent() {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

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

  return (
    <Modal animationType="slide" transparent={true} onRequestClose={closeModal}>
      <View style={styles.modal.container}>
        <View style={styles.modal.content}>
          <View style={styles.modal.closeButton}>
            <TouchableOpacity onPress={closeModal}>
              <FeatherIcon name={'x'} color={'white'} size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modal.header}>Select Difficult</Text>
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
                    styles.modal.options.container.selected
                  }>
                  <Text style={styles.modal.options.text.normal}>
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
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>
              {QuestionDifficult.Any}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default FilterScoresByQuestionDifficultModalContent;
