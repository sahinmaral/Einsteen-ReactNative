import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  banner:{
    height:200,
    width:200,
    resizeMode:"stretch"
  },
  header: {
    container: {padding: 25, flex: 0.75},
    text: {
      fontSize: 28,
      letterSpacing: 1.5,
      fontFamily: 'Anton',
      color: theme.colors.white,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
  },
  buttonGroup: {
    container: {
      justifyContent: 'space-between',
      padding: 25,
      flex: 0.25,
      gap: 10,
    },
    button: {
      container: {
        backgroundColor: theme.colors.darkPurple,
        flex: 1,
        paddingVertical:10,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.larger,
      },
      text: {
        fontSize: 28,
        letterSpacing: 1.5,
        fontFamily: 'Anton',
        textTransform: 'uppercase',
        color: theme.colors.white,
      },
    },
  },
});

export default styles;
