import React from 'react';
import {TouchableOpacity, View, Text, Modal} from 'react-native';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import styles from './FilterScoresByQuestionCountModalContent.styles';
import {closeAllModals} from '../../redux/slices/modalSlice';
import {useDispatch, useSelector} from 'react-redux';
import {setUserSelectedScoreFilter} from '../../redux/slices/authSlice';
import uuid from 'react-native-uuid';

function FilterScoresByQuestionCountModalContent() {
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
          {user.scores.filter.sections.questionCount.map(questionCount => {
            return (
              <TouchableOpacity
                key={uuid.v4()}
                onPress={() => setSelectedQuestionCount(questionCount)}
                style={
                  (user.scores.filter.selected.questionCount !== null &&
                    user.scores.filter.selected.questionCount ===
                      questionCount) &&
                  styles.modal.options.container.selected
                }>
                <Text style={styles.modal.options.text.normal}>
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
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>Any</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default FilterScoresByQuestionCountModalContent;
