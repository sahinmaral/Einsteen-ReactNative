import {useEffect, useMemo, useState} from 'react';
import {FlatList, Image, Text, View, useWindowDimensions} from 'react-native';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import ScoreboardListItem from '../../components/ScoreboardListItem/ScoreboardListItem';
import {
  getScoresCollectionByQuizInformations,
  getUsersAdditionalInformationsByUserIds,
} from '../../services/firebase/FirestoreService';
import {
  mapFirebaseDocumentArrayWithId,
  groupByItemsOfArrayThatDoesntHaveAnyProperty,
} from '../../helpers/arrayMethods';
import Loading from '../../screens/Loading';
import serverErrorBanner from '../../../assets/images/500.png';
import {useSelector} from 'react-redux';
import ScoreboardType from '../../enums/ScoreboardType';
import makeBaseStyles from '../../styles/baseStyles';
import GoBackButton from '../../components/GoBackButton';
import makeStyles from './Scoreboard.styles';

function Scoreboard() {
  const [fetchResult, setFetchResult] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const {competition} = useSelector(state => state.question);

  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);
  const styles = makeStyles(fontScale);

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
      console.log(error);

      setFetchResult({
        ...fetchResult,
        error: 'Error during fetching scoreboard',
        loading: false,
      });
    }
  };

  const modifiedScoreDatas = useMemo(() => {
    if (fetchResult.loading || !fetchResult.data) return;

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
    <View style={baseStyles.mainContainer}>
      <Background type={BackgroundType.Main}>
        <View style={{flex: 1}}>
          <GoBackButton />

          <View style={styles.header.container}>
            <Text style={[styles.header.text, {fontSize: 28 / fontScale}]}>
              Scoreboard
            </Text>
            <Text style={styles.header.text}>
              Top 10 players of {competition.selected.category.value} category
              and {competition.selected.questionCount} total quiz count
            </Text>
          </View>

          {fetchResult.loading && <Loading />}

          {!fetchResult.loading && fetchResult.error && (
            <View style={{flex: 1, alignItems: 'center', gap: 10}}>
              <Image style={styles.error.banner} source={serverErrorBanner} />
              <Text style={styles.error.text}>{fetchResult.error}</Text>
            </View>
          )}

          {!fetchResult.loading &&
            !fetchResult.error &&
            (fetchResult.data && fetchResult.data.scores ? (
              <View style={styles.container}>
                <FlatList
                  data={modifiedScoreDatas}
                  renderItem={({item}) => (
                    <ScoreboardListItem
                      item={item}
                      type={ScoreboardType.AllUsers}
                    />
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            ) : (
              <View style={styles.container}>
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
