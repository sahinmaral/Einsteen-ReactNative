import {useEffect, useMemo, useState} from 'react';
import makeStyles from './ScoreboardOfUser.styles';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import ScoreboardListItem from '../../components/ScoreboardListItem/ScoreboardListItem';
import {
  distinctItemsOfArrayByProperty,
  groupByItemsOfArrayThatDoesntHaveAnyProperty,
  mapFirebaseDocumentArrayWithId,
} from '../../helpers/arrayMethods';
import serverErrorBanner from '../../../assets/images/500.png';
import {useDispatch, useSelector} from 'react-redux';
import {getUserAllScoresByUserId} from '../../services/firebase/FirestoreService';
import ScoreboardType from '../../enums/ScoreboardType';
import ModalType from '../../enums/ModalType';
import {
  clearUserScoreFilter,
  setUserScoreFilterCategories,
} from '../../redux/slices/authSlice';
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../styles/theme';
import makeBaseStyles from '../../styles/baseStyles';
import QuestionDifficult from '../../enums/QuestionDifficult';
import {openModalByType} from '../../redux/slices/modalSlice';
import Loading from '../../screens/Loading';

function ScoreboardOfUser({navigation}) {
  const [fetchResult, setFetchResult] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);
  const styles = makeStyles(fontScale);

  const getScores = async () => {
    try {
      const scoresQuery = await getUserAllScoresByUserId(user.id);

      if (scoresQuery.docs.length === 0) {
        setFetchResult({
          ...fetchResult,
          loading: false,
        });
        return;
      }

      const scoreDatas = mapFirebaseDocumentArrayWithId(scoresQuery.docs);

      const mappedAndGroupedByDifficultAtScoreDatas =
        groupByItemsOfArrayThatDoesntHaveAnyProperty(
          scoreDatas.map(score => score.quizInformations.difficult),
        ).sort();

      const mappedAndGroupedByQuestionCountAtScoreDatas =
        groupByItemsOfArrayThatDoesntHaveAnyProperty(
          scoreDatas.map(score => score.quizInformations.questionCount),
        ).sort();

      const mappedAndGroupedByCategoryAtScoreDatas =
        distinctItemsOfArrayByProperty(
          scoreDatas.map(score => score.quizInformations.category),
          'id',
        ).sort((a, b) => a.value.localeCompare(b.value));

      dispatch(
        setUserScoreFilterCategories({
          difficult: mappedAndGroupedByDifficultAtScoreDatas,
          questionCount: mappedAndGroupedByQuestionCountAtScoreDatas,
          category: mappedAndGroupedByCategoryAtScoreDatas,
        }),
      );

      setFetchResult({
        ...fetchResult,
        data: scoreDatas,
        loading: false,
      });
    } catch (error) {
      console.log(error);

      setFetchResult({
        ...fetchResult,
        error: 'Error during fetching scoreboard',
        loading: false,
      });
    }
  };

  const filteredScoreDatas = useMemo(() => {
    if (fetchResult.loading) return;

    const scoreDatas = fetchResult.data;

    if (!scoreDatas) return;

    return scoreDatas
      .filter(
        score =>
          user.scores.filter.selected.difficult === QuestionDifficult.Any ||
          user.scores.filter.selected.difficult ===
            score.quizInformations.difficult,
      )
      .filter(
        score =>
          user.scores.filter.selected.questionCount === null ||
          user.scores.filter.selected.questionCount ===
            score.quizInformations.questionCount,
      )
      .filter(
        score =>
          user.scores.filter.selected.category === null ||
          user.scores.filter.selected.category.id ===
            score.quizInformations.category.id,
      );
  }, [fetchResult.data, user.scores.filter.selected]);

  useEffect(() => {
    getScores();
  }, []);

  return (
    <View style={baseStyles.mainContainer}>
      <Background type={BackgroundType.Main}>
        <View style={{flex: 1, padding: 25}}>
          <View style={{flex: 0.1}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.goBackButton.text}>Back</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.header.container}>
            <Text style={[styles.header.text, {fontSize: 28 / fontScale}]}>
              Your scores{' '}
              {!fetchResult.loading && !fetchResult.error && fetchResult.data
                ? `(${filteredScoreDatas.length})`
                : null}
            </Text>
          </View>

          <View style={styles.header.optionsButtonGroup.container}>
            <TouchableOpacity
              style={[
                styles.header.optionsButtonGroup.optionsButton.container,
                {
                  backgroundColor: theme.colors.lightGreen,
                },
              ]}
              onPress={() => dispatch(clearUserScoreFilter())}>
              <Text
                style={[
                  styles.header.optionsButtonGroup.optionsButton.text,
                  {color: theme.colors.black},
                ]}>
                Clear filter
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.header.optionsButtonGroup.optionsButton.container}
              onPress={() =>
                dispatch(
                  openModalByType(ModalType.FilterScoresByQuestionCategory),
                )
              }>
              <Text style={styles.header.optionsButtonGroup.optionsButton.text}>
                Category:{' '}
                {user.scores.filter.selected.category === null
                  ? 'Any'
                  : user.scores.filter.selected.category.value}
              </Text>
              <MaterialCommunityIcons
                name="arrow-down-drop-circle"
                color={'white'}
                size={24}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.header.optionsButtonGroup.optionsButton.container}
              onPress={() =>
                dispatch(
                  openModalByType(ModalType.FilterScoresByQuestionDifficult),
                )
              }>
              <Text style={styles.header.optionsButtonGroup.optionsButton.text}>
                Difficult:{' '}
                {user.scores.filter.selected.difficult === null
                  ? 'Any'
                  : user.scores.filter.selected.difficult}
              </Text>
              <MaterialCommunityIcons
                name="arrow-down-drop-circle"
                color={'white'}
                size={24}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.header.optionsButtonGroup.optionsButton.container}
              onPress={() =>
                dispatch(openModalByType(ModalType.FilterScoresByQuestionCount))
              }>
              <Text style={styles.header.optionsButtonGroup.optionsButton.text}>
                Question Count:{' '}
                {user.scores.filter.selected.questionCount === null
                  ? 'Any'
                  : user.scores.filter.selected.questionCount}
              </Text>
              <MaterialCommunityIcons
                name="arrow-down-drop-circle"
                color={'white'}
                size={24}
              />
            </TouchableOpacity>
          </View>

          <View style={{flex: 0.65}}>
            {fetchResult.loading && <Loading />}

            {!fetchResult.loading && fetchResult.error && (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  gap: 10,
                  paddingTop: 20,
                }}>
                <Image style={styles.error.banner} source={serverErrorBanner} />
                <Text style={styles.error.text}>{fetchResult.error}</Text>
              </View>
            )}

            {!fetchResult.loading &&
              !fetchResult.error &&
              (fetchResult.data ? (
                <View style={{flex: 1}}>
                  <FlatList
                    data={filteredScoreDatas}
                    renderItem={({item}) => (
                      <ScoreboardListItem
                        item={item}
                        type={ScoreboardType.IndividualUser}
                      />
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
              ) : (
                <View style={{flex: 1}}>
                  <Text style={styles.subHeader.text}>
                    You don't have any scores because you haven't played any
                    quiz.
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </Background>
    </View>
  );
}

export default ScoreboardOfUser;
