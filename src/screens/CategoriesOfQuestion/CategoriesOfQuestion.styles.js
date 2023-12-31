import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const makeStyles = fontScale =>
  StyleSheet.create({
    container: {
      padding: 25,
    },
    header: {
      username: {
        color: theme.colors.white,
        fontFamily: 'ABeeZee-Regular',
        fontSize: 20/fontScale,
        paddingBottom: 50,
      },
      optionsButtonGroup: {
        container: {flexDirection: 'row', justifyContent: 'space-between'},
        optionsButton: {
          container: {
            backgroundColor: theme.colors.darkGray,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            justifyContent: 'center',
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
      fontFamily: 'Anton',
      fontSize: 20 / fontScale,
      color: theme.colors.white,
    },
    modal: {
      container: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      content: {
        backgroundColor: theme.colors.darkPurple,
        paddingHorizontal: 35,
        paddingBottom: 35,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      closeButton: {
        paddingTop: 25,
        alignItems: 'flex-end',
      },
      header: {
        fontFamily: 'Anton',
        fontSize: 20 / fontScale,
        color: theme.colors.white,
        paddingBottom: 10,
      },
      difficult: {
        container: {
          selected: {
            borderBottomColor: theme.colors.darkGray,
            borderBottomWidth: 1,
            width: '40%',
          },
        },
        text: {
          normal: {
            fontFamily: 'Anton',
            fontSize: 20 / fontScale,
            color: theme.colors.black,
          },
        },
      },
    },
  });

export default makeStyles;
