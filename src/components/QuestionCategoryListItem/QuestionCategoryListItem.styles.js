import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const makeStyles = (fontScale) => StyleSheet.create({
  container: {
    borderBottomColor: theme.colors.darkGray,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  text: {color: theme.colors.white, fontSize: 22/fontScale},
});

export default makeStyles;
