import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  backgroundImage: {
    container: {flex: 1},
    blur: {
      width: '100%',
      flex: 1,
      opacity: 0.8,
      position: 'absolute',
    },
  },
  logo: {
    container: {
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
    },
    firstHeader: {
      fontFamily: 'Anton',
      fontSize: 70,
    },
    secondHeader: {
      color: theme.colors.white,
      fontFamily: 'Barlow-Bold',
      fontSize: 40,
    },
  },
  buttonGroup: {
    container: {
      gap: 10,
      marginTop: 150,
    },
    button: {
      container: {
        backgroundColor: theme.colors.white,
        ...theme.shadows.normal,
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 30,
        alignItems: 'center',
      },
      text: {
        fontSize: 18,
        color: theme.colors.veryDarkGray,
      },
    },
  },
});

export default styles;
