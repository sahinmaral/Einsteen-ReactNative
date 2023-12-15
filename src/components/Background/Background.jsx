import {ImageBackground, Image, View} from 'react-native';
import backgroundImage from '../../../assets/images/background.png';
import purpleBlur from '../../../assets/images/purpleBlur.png';
import styles from './Background.styles';
import BackgroundType from '../../enums/BackgroundType';

function Background({children, style, type}) {
  if (type === BackgroundType.Auth) {
    return (
      <ImageBackground
        source={backgroundImage}
        resizeMode="cover"
        style={styles.backgroundImage.container}>
        <Image
          resizeMode="cover"
          source={purpleBlur}
          style={styles.backgroundImage.blur}
        />

        <View style={{flex: 1, ...style}}>{children}</View>
      </ImageBackground>
    );
  } else {
    return (
      <ImageBackground
        source={purpleBlur}
        resizeMode="cover"
        style={styles.backgroundImage.container}>
        <View style={{flex: 1, ...style}}>{children}</View>
      </ImageBackground>
    );
  }
}

export default Background;
