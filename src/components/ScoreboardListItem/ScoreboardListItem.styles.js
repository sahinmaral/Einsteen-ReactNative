import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 5,
    flexDirection: 'row',
    marginVertical: 5,
  },
  thumbnail: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  content: {
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 5,
      backgroundColor: theme.colors.darkPurple,
    },
    text: {
      fontFamily: 'Anton',
      fontSize: 15,
      color: theme.colors.white,
    },
  },
});

export default styles;
