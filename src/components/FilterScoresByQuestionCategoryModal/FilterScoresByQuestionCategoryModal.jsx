import {TouchableOpacity, View, Text, ScrollView, useWindowDimensions} from 'react-native';
import makeBaseStyles from '../../styles/baseStyles';
import {closeAllModals} from '../../redux/slices/modalSlice';
import {useDispatch, useSelector} from 'react-redux';
import {setUserSelectedScoreFilter} from '../../redux/slices/authSlice';
import uuid from 'react-native-uuid';
import CustomModal from '../CustomModal';

function FilterScoresByQuestionCategoryModal() {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);

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

  const Content = () => {
    return (
      <ScrollView style={{flex: 1}}>
        {user.scores.filter.sections.category.map(category => {
          return (
            <TouchableOpacity
              key={uuid.v4()}
              onPress={() => setSelectedCategory(category)}
              style={
                user.scores.filter.selected.category !== null &&
                user.scores.filter.selected.category.id === category.id &&
                baseStyles.modal.options.container.selected
              }>
              <Text style={baseStyles.modal.options.text.normal}>
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
            baseStyles.modal.options.container.selected
          }>
          <Text style={baseStyles.modal.options.text.normal}>Any</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <CustomModal
      closeModal={closeModal}
      headerText={'Select category to filter'}
      contentComponent={<Content />}
      style={{
        container: {flex: 0.25},
        header: {flex: 0.3},
        content: {flex: 0.6},
      }}
    />
  );
}

export default FilterScoresByQuestionCategoryModal;
