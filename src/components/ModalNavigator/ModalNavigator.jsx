import {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {openModalByType} from '../../redux/slices/modalSlice';
import ModalType from '../../enums/ModalType';
import VerifySignOutUserModalContent from '../VerifySignOutUserModalContent';
import QuestionDifficultModalContent from '../QuestionDifficultModalContent';
import QuestionCountModalContent from '../QuestionCountModalContent';
import VerifyQuitQuizModalContent from '../VerifyQuitQuizModalContent';
import UpdateProfilePhotoModalContent from '../UpdateProfilePhotoModalContent';
import {useNavigation} from '@react-navigation/native';

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
    return <VerifySignOutUserModalContent />;
  } else if (modal.visibility.chooseDifficult) {
    return <QuestionDifficultModalContent />;
  } else if (modal.visibility.chooseQuestionCount) {
    return <QuestionCountModalContent />;
  } else if (modal.visibility.verifyQuitQuiz) {
    return <VerifyQuitQuizModalContent />;
  } else if (modal.visibility.updateProfilePhoto) {
    return <UpdateProfilePhotoModalContent />;
  } else {
    return null;
  }
}

export default ModalNavigator;
