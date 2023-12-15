import {useCallback, useMemo, useState, useEffect} from 'react';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import QuestionDifficult from '../../enums/QuestionDifficult';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  BackHandler,
} from 'react-native';
import styles from './CategoriesOfQuestion.styles';
import QuestionCategoryListItem from '../../components/QuestionCategoryListItem';
import categories from '../../constants/CategoryOfQuestion';
import QuestionDifficultModalContent from '../../components/QuestionDifficultModalContent/QuestionDifficultModalContent';
import QuestionCountModalContent from '../../components/QuestionCountModalContent/QuestionCountModalContent';
import {useSelector} from 'react-redux';
import VerifySignOutUserModalContent from '../../components/VerifySignOutUserModalContent/VerifySignOutUserModalContent';

function CategoriesOfQuestion({navigation}) {
  const initialStates = {
    modalVisible: {
      difficult: false,
      questionCount: false,
      verifySignedOut: false,
    },
    selectedOptions: {
      difficult: QuestionDifficult.Any,
      questionCount: 10,
    },
  };

  const [modalVisible, setModalVisible] = useState(initialStates.modalVisible);
  const [selectedOptions, setSelectedOptions] = useState(
    initialStates.selectedOptions,
  );

  const {user} = useSelector(state => state.auth);

  const sortedCategories = useMemo(() => {
    return categories.sort(function (a, b) {
      var textA = a.value.toUpperCase();
      var textB = b.value.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }, [categories]);

  const closeAllModals = () => {
    setModalVisible(initialStates.modalVisible);
  };

  const setSelectedDifficult = selectedDifficult => {
    setSelectedOptions({
      ...selectedOptions,
      difficult: selectedDifficult,
    });
  };

  const setSelectedQuestionCount = selectedQuestionCount => {
    setSelectedOptions({
      ...selectedOptions,
      questionCount: selectedQuestionCount,
    });
  };

  const renderModalByModalVisible = useCallback(() => {
    if (modalVisible.difficult) {
      return (
        <QuestionDifficultModalContent
          closeAllModals={closeAllModals}
          selectedDifficult={selectedOptions.difficult}
          setSelectedDifficult={setSelectedDifficult}
        />
      );
    } else if (modalVisible.questionCount) {
      return (
        <QuestionCountModalContent
          closeAllModals={closeAllModals}
          selectedQuestionCount={selectedOptions.questionCount}
          setSelectedQuestionCount={setSelectedQuestionCount}
        />
      );
    } else if (modalVisible.verifySignedOut) {
      return <VerifySignOutUserModalContent closeAllModals={closeAllModals} />;
    } else {
      return null;
    }
  }, [modalVisible, selectedOptions]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setModalVisible({...modalVisible, verifySignedOut: true});
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {
        setModalVisible({...modalVisible, verifySignedOut: true});
        return true;
      });
    };
  }, []);

  return (
    <Pressable style={styles.mainContainer}>
      <Background type={BackgroundType.Main}>
        {renderModalByModalVisible()}
        <View style={styles.container}>
          <View style={{marginVertical: 50}}>
            <Text style={styles.header.username}>
              We are glad to have you {user.firstName}!
            </Text>
            <View style={styles.header.optionsButtonGroup.container}>
              <TouchableOpacity
                style={styles.header.optionsButtonGroup.optionsButton.container}
                onPress={() =>
                  setModalVisible({...modalVisible, difficult: true})
                }>
                <Text
                  style={styles.header.optionsButtonGroup.optionsButton.text}>
                  Level: {selectedOptions.difficult}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.header.optionsButtonGroup.optionsButton.container}
                onPress={() =>
                  setModalVisible({...modalVisible, questionCount: true})
                }>
                <Text
                  style={styles.header.optionsButtonGroup.optionsButton.text}>
                  Question Count: {selectedOptions.questionCount}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.subHeader}>Select Category</Text>
          <FlatList
            data={sortedCategories}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <QuestionCategoryListItem
                category={item}
                selectedOptions={selectedOptions}
              />
            )}
          />
        </View>
      </Background>
    </Pressable>
  );
}

export default CategoriesOfQuestion;
