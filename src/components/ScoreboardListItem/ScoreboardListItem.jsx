import React, {useMemo} from 'react';
import {Image, Text, View, useWindowDimensions} from 'react-native';
import {formatTime} from '../../helpers/timerMethods';
import defaultUserThumbnail from '../../../assets/images/defaultUserThumbnail.png';
import makeStyles from './ScoreboardListItem.styles';
import ScoreboardType from '../../enums/ScoreboardType';

function ScoreboardListItem({item, type}) {
  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);

  const userProfileThumbnailSource = useMemo(() => {
    if (item.user) {
      return !item.user.photoURL
        ? defaultUserThumbnail
        : {uri: item.user.photoURL};
    } else {
      return null;
    }
  }, [item]);

  const UserThumbnail = () => {
    if (type === ScoreboardType.AllUsers) {
      return item.user.photoURL ? (
        <Image style={styles.thumbnail} source={userProfileThumbnailSource} />
      ) : (
        <Image style={styles.thumbnail} source={defaultUserThumbnail} />
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <UserThumbnail />

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
