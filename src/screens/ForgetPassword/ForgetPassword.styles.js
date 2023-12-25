import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const makeStyles = fontScale =>
  StyleSheet.create({
    header: {
      fontSize: 30 / fontScale,
      color: theme.colors.white,
      fontFamily: 'ABeeZee-Regular',
    },
    information: {
      fontSize: 15 / fontScale,
      color: theme.colors.darkGray,
      fontFamily: 'ABeeZee-Regular',
    },
  });

export default makeStyles;
