import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const makeStyles = fontScale =>
  StyleSheet.create({
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
        fontSize: 70 / fontScale,
      },
      secondHeader: {
        color: theme.colors.white,
        fontFamily: 'Barlow-Bold',
        fontSize: 40 / fontScale,
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
          justifyContent: 'center',
          alignItems: 'center',
          width: 250,
        },
        text: {
          fontSize: 18 / fontScale,
          color: theme.colors.veryDarkGray,
        },
      },
    },
  });

export default makeStyles;
