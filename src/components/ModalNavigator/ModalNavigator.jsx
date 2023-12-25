import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {openModalByType} from '../../redux/slices/modalSlice';
import ModalType from '../../enums/ModalType';
import {useNavigation} from '@react-navigation/native';
import VerifySignOutUserModal from '../VerifySignOutUserModal';
import QuestionDifficultModal from '../QuestionDifficultModal';
import QuestionCountModal from '../QuestionCountModal';
import UpdateProfilePhotoModal from '../UpdateProfilePhotoModal';
import VerifyQuitQuizModal from '../VerifyQuitQuizModal';
import FilterScoresByQuestionDifficultModal from '../FilterScoresByQuestionDifficultModal';
import FilterScoresByQuestionCountModal from '../FilterScoresByQuestionCountModal';
import FilterScoresByQuestionCategoryModal from '../FilterScoresByQuestionCategoryModal';

function ModalNavigator({currentRoute}) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const modal = useSelector(state => state.modal);

  const [previousScreen, setPreviousScreen] = useState({
    scoreboard: null,
  });

  useEffect(() => {
    const handleHardwareBackPress = () => {
      switch (currentRoute) {
        case 'QuizSolving':
          dispatch(openModalByType(ModalType.VerifyQuitQuiz));
          break;
        case 'UpdatePassword':
        case 'UpdateProfilePhoto':
          navigation.navigate('UserProfile');
          break;
        case 'ResultOfQuiz':
        case 'ChosenCategory':
          navigation.navigate('Homepage');
          break;
        case 'Scoreboard':
          navigation.navigate(previousScreen.scoreboard);
          break;
        default:
          dispatch(openModalByType(ModalType.VerifySignedOut));
          break;
      }

      return true;
    };

    if (currentRoute === 'ResultOfQuiz' || currentRoute === 'ChosenCategory') {
      setPreviousScreen({
        ...previousScreen,
        scoreboard: currentRoute,
      });
    }

    BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleHardwareBackPress,
      );
    };
  }, [currentRoute]);

  if (modal.visibility.verifySignedOut) {
    return <VerifySignOutUserModal />;
  } else if (modal.visibility.chooseDifficult) {
    return <QuestionDifficultModal />;
  } else if (modal.visibility.chooseQuestionCount) {
    return <QuestionCountModal />;
  } else if (modal.visibility.updateProfilePhoto) {
    return <UpdateProfilePhotoModal />;
  } else if (modal.visibility.verifyQuitQuiz) {
    return <VerifyQuitQuizModal />;
  } else if (modal.visibility.filterScoresByQuestionDifficult) {
    return <FilterScoresByQuestionDifficultModal />;
    } else if (modal.visibility.filterScoresByQuestionCount) {
      return <FilterScoresByQuestionCountModal />;
    } else if (modal.visibility.filterScoresByQuestionCategory) {
      return <FilterScoresByQuestionCategoryModal />;
  } else {
    return null;
  }
}

export default ModalNavigator;
