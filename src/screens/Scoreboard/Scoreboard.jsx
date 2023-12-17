import {useEffect, useMemo, useState} from 'react';
import styles from './Scoreboard.styles';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import ScoreboardListItem from '../../components/ScoreboardListItem/ScoreboardListItem';
import {
  getScoresCollectionByQuizInformations,
  getUsersAdditionalInformationsByUserIds,
} from '../../services/FirebaseService';
import {
  mapFirebaseDocumentArrayWithId,
  groupByItemsOfArrayThatDoesntHaveAnyProperty,
} from '../../helpers/arrayMethods';
import LottieView from 'lottie-react-native';
import loadingAnimation from '../../../assets/animations/loading.json';
import serverErrorBanner from '../../../assets/images/500.png';
import {useSelector} from 'react-redux';

function Scoreboard({navigation}) {
  const [fetchResult, setFetchResult] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const {competition} = useSelector(state => state.question);

  const getScores = async () => {
    try {
      const scoresQuery = await getScoresCollectionByQuizInformations(
        competition.selected,
      );

      if (scoresQuery.docs.length === 0) {
        setFetchResult({
          ...fetchResult,
          loading: false,
        });
        return;
      }

      const scoreDatas = mapFirebaseDocumentArrayWithId(scoresQuery.docs);

      const groupedUserIds = groupByItemsOfArrayThatDoesntHaveAnyProperty(
        scoreDatas.map(score => score.userId),
      );

      const usersQuery = await getUsersAdditionalInformationsByUserIds(
        groupedUserIds,
      );

      const userDatas = mapFirebaseDocumentArrayWithId(usersQuery.docs);

      setFetchResult({
        ...fetchResult,
        data: {
          scores: scoreDatas,
          users: userDatas,
        },
        loading: false,
      });
    } catch (error) {

      setFetchResult({
        ...fetchResult,
        error,
        loading: false,
      });
    }
  };

  const modifiedScoreDatas = useMemo(() => {
    if (fetchResult.loading) return;

    const scoreDatas = fetchResult.data.scores;
    return scoreDatas.map(({userId, ...restOfObjects}) => {
      return {
        ...restOfObjects,
        user: fetchResult.data.users.find(user => user.id === userId),
      };
    });
  }, [fetchResult.data]);

  useEffect(() => {
    getScores();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Background type={BackgroundType.Main}>
        <View style={{flex: 1, padding: 25}}>
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.goBackButton.text}>Back</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.header.container}>
            <Text style={[styles.header.text, {fontSize: 28}]}>Scoreboard</Text>
            <Text style={styles.header.text}>
              Top 10 players of {competition.selected.category.value} category
              and {competition.selected.questionCount} total quiz count
            </Text>
          </View>

          {fetchResult.loading && (
            <LottieView
              style={{flex: 1}}
              source={loadingAnimation}
              autoPlay
              loop
            />
          )}

          {!fetchResult.loading && fetchResult.error && (
            <View style={{flex: 1, alignItems: 'center', gap: 10}}>
              <Image style={styles.error.banner} source={serverErrorBanner} />
              <Text style={styles.error.text}>{fetchResult.error}</Text>
            </View>
          )}

          {!fetchResult.loading &&
            !fetchResult.error &&
            (fetchResult.data && fetchResult.data.scores ? (
              <View style={{flex: 1}}>
                <FlatList
                  data={modifiedScoreDatas}
                  renderItem={({item}) => <ScoreboardListItem item={item} />}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : (
              <View style={{flex: 1}}>
                <Text style={styles.subHeader.text}>
                  There hasn't been added any scores at this quiz you selected.
                </Text>
              </View>
            ))}
        </View>
      </Background>
    </View>
  );
}

export default Scoreboard;
