import React from 'react';
import {TouchableOpacity, View, Text, Modal} from 'react-native';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import styles from './QuestionCountModalContent.styles';
import {useDispatch, useSelector} from 'react-redux';
import { closeAllModals } from '../../redux/slices/modalSlice';

function QuestionCountModalContent() {
  const {competition} = useSelector(state => state.question);

  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  const setSelectedQuestionCount = selectedQuestionCount => {
    dispatch(setSelectedQuestionCount(selectedQuestionCount));
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
          <Text style={styles.modal.header}>Select Question Count</Text>
          <TouchableOpacity
            onPress={() => setSelectedQuestionCount(10)}
            style={
              competition.selected.questionCount === 10 &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedQuestionCount(20)}
            style={
              competition.selected.questionCount === 20 &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>20</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedQuestionCount(30)}
            style={
              competition.selected.questionCount === 30 &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>30</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedQuestionCount(40)}
            style={
              competition.selected.questionCount === 40 &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>40</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedQuestionCount(50)}
            style={
              competition.selected.questionCount === 50 &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>50</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default QuestionCountModalContent;
