import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  error: {
    text:{
      fontFamily: 'AbeeZee-Regular',
      fontSize: 20,
      color: theme.colors.lightRed,
    },
    banner: {
      width:250,
      height:250,
      resizeMode: 'stretch',
    }
  },
  goBackButton: {
    text: {
      fontFamily: 'AbeeZee-Regular',
      fontSize: 15,
      color: theme.colors.white,
    },
  },
  header: {
    container: {flex: 0.35},
    text: {
      fontSize: 20,
      letterSpacing: 1.5,
      fontFamily: 'Anton',
      color: theme.colors.white,
      letterSpacing: 2,
    },
  },
});

export default styles;
