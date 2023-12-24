import React from 'react';
import {TouchableOpacity, View, Text, Modal} from 'react-native';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import styles from './FilterScoresByQuestionCategoryModalContent.styles';
import {closeAllModals} from '../../redux/slices/modalSlice';
import {useDispatch, useSelector} from 'react-redux';
import {setUserSelectedScoreFilter} from '../../redux/slices/authSlice';
import uuid from 'react-native-uuid';

function FilterScoresByQuestionCategoryModalContent() {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(closeAllModals());
  };

  const setSelectedCategory = selectedCategory => {
    dispatch(
      setUserSelectedScoreFilter({
        ...user.scores.filter.selected,
        category: selectedCategory,
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
          <Text style={styles.modal.header}>Select category to filter</Text>

          {user.scores.filter.sections.category.map(category => {
            return (
              <TouchableOpacity
                key={uuid.v4()}
                onPress={() => setSelectedCategory(category)}
                style={
                  user.scores.filter.selected.category !== null &&
                  user.scores.filter.selected.category.id === category.id &&
                  styles.modal.options.container.selected
                }>
                <Text style={styles.modal.options.text.normal}>
                  {category.value}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            key={uuid.v4()}
            onPress={() => setSelectedCategory(null)}
            style={
              user.scores.filter.selected.category === null &&
              styles.modal.options.container.selected
            }>
            <Text style={styles.modal.options.text.normal}>Any</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default FilterScoresByQuestionCategoryModalContent;
