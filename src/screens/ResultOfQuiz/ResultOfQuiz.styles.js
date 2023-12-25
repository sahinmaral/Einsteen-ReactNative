import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const makeStyles = fontScale =>
  StyleSheet.create({
    banner: {
      height: 200,
      width: 200,
      resizeMode: 'stretch',
    },
    header: {
      container: {padding: 25, flex: 0.75},
      text: {
        fontSize: 28 / fontScale,
        letterSpacing: 1.5,
        fontFamily: 'Anton',
        color: theme.colors.white,
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
          paddingVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          ...theme.shadows.larger,
        },
        text: {
          fontSize: 20 / fontScale,
          letterSpacing: 1.5,
          fontFamily: 'Anton',
          color: theme.colors.white,
        },
      },
    },
  });

export default makeStyles;
