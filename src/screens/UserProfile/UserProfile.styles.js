import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    text: {
      fontSize: 28,
      letterSpacing: 1.5,
      fontFamily: 'Anton',
      color: theme.colors.white,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    informations: {
      container: {
        top: 50,
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      thumbnail: {
        height: 150,
        width: 150,
        borderRadius: 75,
        backgroundColor: theme.colors.white,
      },
      text: {
        fontSize: 20,
        fontFamily: 'ABeeZee-Regular',
      },
    },
  },
  buttonGroup: {
    container: {flex: 0.6, justifyContent: 'flex-end', padding: 10},
    row: {
      flexDirection: 'row',
      gap: 10,
    },
    button: {
      container: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: theme.colors.darkPurple,
      },
      text: {
        color: theme.colors.white,
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'ABeeZee-Regular',
      },
    },
  },
});

export default styles;
