import React, {useMemo} from 'react';
import {Image, Text, View} from 'react-native';
import {formatTime} from '../../helpers/timerMethods';
import defaultUserThumbnail from '../../../assets/images/defaultUserThumbnail.png';
import styles from './ScoreboardListItem.styles';

function ScoreboardListItem({item}) {
  const userProfileThumbnailSource = useMemo(() => {

    return !item.user.photoURL
      ? defaultUserThumbnail
      : {uri: item.user.photoURL};
  }, [item.user.photoURL]);

  return (
    <View style={styles.container}>
      {item.user.photoURL ? (
        <Image style={styles.thumbnail} source={userProfileThumbnailSource} />
      ) : (
        <Image style={styles.thumbnail} source={defaultUserThumbnail} />
      )}

      <View style={styles.content.container}>
        <Text style={styles.content.text}>
          {item.quizInformations.correctQuestionCount} Question Correct
        </Text>

        <Text style={styles.content.text}>
          {formatTime(item.quizInformations.totalEstimated)}
        </Text>
      </View>
    </View>
  );
}

export default ScoreboardListItem;
