import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  modal: {
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    content: {
      backgroundColor: theme.colors.darkPurple,
      paddingHorizontal: 35,
      paddingVertical: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    header: {
      fontFamily: 'Anton',
      fontSize: 23,
      color: theme.colors.white,
      marginBottom: 10,
    },
    options: {
      container: {
        normal: {
          flex: 0.4,
          alignItems: 'center',
          borderRadius: 5,
        },
      },
      text: {
        normal: {fontFamily: 'Anton', fontSize: 23, color: theme.colors.black},
      },
    },
  },
});

export default styles