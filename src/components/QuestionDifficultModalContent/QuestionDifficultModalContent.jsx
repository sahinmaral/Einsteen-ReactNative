import React from 'react';
import {TouchableOpacity, View, Text, Modal} from 'react-native';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import QuestionDifficult from '../../enums/QuestionDifficult';
import styles from './QuestionDifficultModalContent.styles';

function QuestionDifficultModalContent({
  closeAllModals,
  selectedDifficult,
  setSelectedDifficult,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={closeAllModals}>
      <View style={styles.modal.container}>
        <View style={styles.modal.content}>
          <View style={styles.modal.closeButton}>
            <TouchableOpacity onPress={closeAllModals}>
              <FeatherIcon name={'x'} color={'white'} size={24} />
            </TouchableOpacity>
          </View>
          <Text style={styles.modal.header}>Select Difficult</Text>
          <TouchableOpacity
            onPress={() => setSelectedDifficult(QuestionDifficult.Easy)}
            style={
              selectedDifficult === QuestionDifficult.Easy &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>Easy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedDifficult(QuestionDifficult.Medium)}
            style={
              selectedDifficult === QuestionDifficult.Medium &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedDifficult(QuestionDifficult.Hard)}
            style={
              selectedDifficult === QuestionDifficult.Hard &&
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
