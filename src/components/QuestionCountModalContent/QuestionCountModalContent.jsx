import React from 'react';
import {TouchableOpacity, View, Text, Modal} from 'react-native';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import styles from './QuestionCountModalContent.styles';

function QuestionCountModalContent({
  closeAllModals,
  selectedQuestionCount,
  setSelectedQuestionCount,
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
          <Text style={styles.modal.header}>Select Question Count</Text>
          <TouchableOpacity
            onPress={() => setSelectedQuestionCount(10)}
            style={
              selectedQuestionCount === 10 &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedQuestionCount(20)}
            style={
              selectedQuestionCount === 20 &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>20</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedQuestionCount(30)}
            style={
              selectedQuestionCount === 30 &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>30</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedQuestionCount(40)}
            style={
              selectedQuestionCount === 40 &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>40</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedQuestionCount(50)}
            style={
              selectedQuestionCount === 50 &&
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
