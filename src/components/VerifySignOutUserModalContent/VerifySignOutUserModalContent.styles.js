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
      paddingBottom: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    closeButton: {
      paddingTop: 25,
      alignItems: 'flex-end',
    },
    header: {
      fontFamily: 'Anton',
      fontSize: 23,
      color: theme.colors.white,
      marginBottom: 10,
    },
    options: {
      container:{
        paddingHorizontal:20,
        borderRadius:5,
      },
      text: {
        normal: {fontFamily: 'Anton', fontSize: 23, color: theme.colors.black},
      },
    },
  },
});

export default styles