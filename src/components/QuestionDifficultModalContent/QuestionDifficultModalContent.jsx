import React from 'react';
import {TouchableOpacity, View, Text, Modal} from 'react-native';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import QuestionDifficult from '../../enums/QuestionDifficult';
import styles from './QuestionDifficultModalContent.styles';
import {useDispatch, useSelector} from 'react-redux';
import { closeAllModals } from '../../redux/slices/modalSlice';

function QuestionDifficultModalContent() {
  const {competition} = useSelector(state => state.question);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  const setSelectedDifficult = selectedDifficult => {
    dispatch(setSelectedDifficult(selectedDifficult));
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
          <TouchableOpacity
            onPress={() => setSelectedDifficult(QuestionDifficult.Easy)}
            style={
              competition.selected.difficult === QuestionDifficult.Easy &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedDifficult(QuestionDifficult.Medium)}
            style={
              competition.selected.difficult === QuestionDifficult.Medium &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedDifficult(QuestionDifficult.Hard)}
            style={
              competition.selected.difficult === QuestionDifficult.Hard &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>Hard</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default QuestionDifficultModalContent;
