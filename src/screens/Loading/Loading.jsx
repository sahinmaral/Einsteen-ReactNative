import LottieView from 'lottie-react-native';
import loadingAnimation from '../../../assets/animations/loading.json';

function Loading() {
  return (
    <LottieView style={{flex: 1}} source={loadingAnimation} autoPlay loop />
  );
}

export default Loading;
