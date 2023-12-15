import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.veryDarkPink,
  },
  button: {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    text: {
      color: theme.colors.white,
      fontSize: 14,
      fontFamily: 'ABeeZee-Regular',
    },
  },
});

export default styles;
