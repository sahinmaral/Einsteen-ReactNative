import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';
import makeBaseStyles from '../../styles/baseStyles';

const makeStyles = fontScale =>
  StyleSheet.create({
    header: {
      container: {padding: 25, alignItems: 'center'},
      text: {
        fontSize: 25 / fontScale,
        letterSpacing: 1.5,
        fontFamily: 'Anton',
        color: theme.colors.white,
        letterSpacing: 2,
      },
      questionCount: {
        paddingTop: 10,
        fontSize: 30 / fontScale,
        fontFamily: 'ABeeZee-Regular',
        color: theme.colors.darkGray,
      },
    },
    instructions: {
      container: {
        alignItems: 'center',
      },
      text: {
        fontSize: 20 / fontScale,
        fontFamily: 'ABeeZee-Regular',
        color: theme.colors.white,
      },
    },
    buttonGroup: {
      container: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 30,
      },
      submitButton: {
        container: {
          ...makeBaseStyles(fontScale).button.submitButton.container,
          ...theme.shadows.larger,
          flex: 0.45,
        },
        text: {
          ...makeBaseStyles(fontScale).button.submitButton.text,
          letterSpacing: 1.5,
        },
      },
    },
  });

export default makeStyles;
