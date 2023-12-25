import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const makeStyles = fontScale =>
  StyleSheet.create({
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
      container: {flex: 0.1},
      text: {
        fontSize: 20 / fontScale,
        letterSpacing: 1.5,
        fontFamily: 'Anton',
        color: theme.colors.white,
      },
      optionsButtonGroup: {
        container: {flex: 0.3, gap: 10, paddingBottom: 20},
        optionsButton: {
          container: {
            backgroundColor: theme.colors.darkGray,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          },
          text: {
            color: theme.colors.white,
            fontFamily: 'ABeeZee-Regular',
            fontSize: 15 / fontScale,
          },
        },
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
