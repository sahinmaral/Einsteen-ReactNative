import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  goBackButton: {
    container: {
      marginTop: 25,
      marginLeft: 25,
    },
    text: {
      fontSize: 15,
      fontFamily: 'ABeeZee-Regular',
      color: theme.colors.white,
    },
  },
  header: {
    container: {padding: 25, alignItems: 'center'},
    text: {
      fontSize: 28,
      letterSpacing: 1.5,
      fontFamily: 'Anton',
      color: theme.colors.white,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    questionCount: {
      marginTop: 10,
      fontSize: 30,
      fontFamily: 'ABeeZee-Regular',
      color: theme.colors.darkGray,
    },
  },
  instructions: {
    container: {
      alignItems: 'center',
    },
    text: {
      fontSize: 23,
      fontFamily: 'ABeeZee-Regular',
      color: theme.colors.white,
    },
  },
  buttonGroup: {
    container: {
      width:"100%",
      position: 'absolute',
      flexDirection: 'row',
      justifyContent:"space-between",
      bottom: 30,
    },
    submitButton: {
      container: {
        flex:0.45,
        backgroundColor: theme.colors.darkPurple,
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
