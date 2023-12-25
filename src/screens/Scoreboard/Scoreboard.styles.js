import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const makeStyles = fontScale =>
  StyleSheet.create({
    container: {flex: 1, paddingHorizontal: 25},
    error: {
      text: {
        fontFamily: 'AbeeZee-Regular',
        fontSize: 20 / fontScale,
        color: theme.colors.lightRed,
      },
      banner: {
        width: 250,
        height: 250,
        resizeMode: 'stretch',
      },
    },
    goBackButton: {
      text: {
        fontFamily: 'AbeeZee-Regular',
        fontSize: 15 / fontScale,
        color: theme.colors.white,
      },
    },
    header: {
      container: {flex: 0.4, paddingHorizontal: 25},
      text: {
        fontSize: 20 / fontScale,
        letterSpacing: 1.5,
        fontFamily: 'Anton',
        color: theme.colors.white,
      },
    },
    subHeader: {
      text: {
        fontSize: 14 / fontScale,
        fontFamily: 'ABeeZee-Regular',
        color: theme.colors.white,
      },
    },
  });

export default makeStyles;
