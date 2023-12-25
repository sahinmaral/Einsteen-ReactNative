import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const makeStyles = fontScale =>
  StyleSheet.create({
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
        fontFamily: 'ABeeZee-Regular',
        fontSize: 14 / fontScale,
      },
    },
  });

export default makeStyles;
