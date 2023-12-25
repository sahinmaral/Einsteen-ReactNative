import LottieView from 'lottie-react-native';
import {Appearance, useWindowDimensions, View, Text} from 'react-native';
import theme from '../../styles/theme';
import checkInternetAnimation from '../../../assets/animations/check-internet.json';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';

function CheckInternet() {
  const colorScheme = Appearance.getColorScheme();

  const {fontScale} = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Background type={BackgroundType.Main}>
        <View
          style={{flex: 2, alignItems: 'center', justifyContent: 'flex-end'}}>
          <View
            style={{
              width: '75%',
              height: '75%',
            }}>
            <LottieView
              style={{flex: 1}}
              source={checkInternetAnimation}
              autoPlay
              loop
            />
          </View>
        </View>
        <Text
          style={{
            flex: 1,
            fontSize: 24 / fontScale,
            paddingTop: 50,
            paddingHorizontal: 25,
            textAlign: 'center',
            fontWeight: 'bold',
            color:
              colorScheme === 'light' ? theme.colors.black : theme.colors.white,
          }}>
          To use this application, you have to connect internet. Try re-open app
          after enable internet.
        </Text>
      </Background>
    </View>
  );
}

export default CheckInternet;
