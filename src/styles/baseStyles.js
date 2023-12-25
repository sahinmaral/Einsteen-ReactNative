import {StyleSheet} from 'react-native';
import theme from './theme';

const makeBaseStyles = fontScale =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    button: {
      goBackButton: {
        container: {
          paddingTop: 25,
          paddingLeft: 25,
        },
        text: {
          fontSize: 13 / fontScale,
          fontFamily: 'ABeeZee-Regular',
          color: theme.colors.white,
        },
      },
      submitButton: {
        container: {
          flex: 0.1,
          gap: 10,
          flexDirection: 'row',
          backgroundColor: theme.colors.darkPurple,
          justifyContent: 'center',
          alignItems: 'center',
        },
        text: {
          fontSize: 28 / fontScale,
          fontFamily: 'Anton',
          color: theme.colors.white,
        },
      },
    },
    form: {
      auth: {
        container: {
          justifyContent: 'center',
          borderRadius: 40,
          paddingHorizontal: 20,
          paddingVertical: 30,
          backgroundColor: theme.colors.veryDarkGrayFaded,
          width: 300,
        },
        input: {
          borderBottomColor: theme.colors.darkGrayishRed,
          borderBottomWidth: 1,
          fontSize: 16 / fontScale,
          paddingHorizontal: 0,
          paddingBottom: 5,
          fontFamily: 'ABeeZee-Regular',
          color: theme.colors.white,
        },
      },
      error: {
        marginTop: 5,
        fontSize: 15 / fontScale,
        color: theme.colors.strongRed,
        fontFamily: 'ABeeZee-Regular',
      },
    },
    modal: {
      options: {
        container: {
          selected: {
            borderBottomColor: theme.colors.darkGray,
            borderBottomWidth: 1,
          },
        },
        text: {
          normal: {
            fontFamily: 'Anton',
            fontSize: 23 / fontScale,
            color: theme.colors.black,
          },
        },
      },
    },
    text: {color: theme.colors.white, fontSize: 14 / fontScale},
  });

export default makeBaseStyles;
