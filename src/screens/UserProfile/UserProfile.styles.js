import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    text: {
      fontSize: 28,
      fontFamily: 'Anton',
      color: theme.colors.white,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    informations: {
      container: {
        top: 50,
        position: 'absolute',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      thumbnail: {
        height: 150,
        width: 150,
        borderRadius: 75,
        resizeMode: "stretch",
        backgroundColor: theme.colors.white,
      },
      text: {
        fontSize: 20,
        fontFamily: 'ABeeZee-Regular',
      },
    },
  },
  updateProfilePhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    borderWidth: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  menu: {
    container: {
      gap: 10,
      padding: 10,
      flex: 0.6,
    },
    button: {
      container: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: theme.colors.white,
      },
      text: {
        fontSize: 14,
        fontFamily: 'ABeeZee-Regular',
        color: theme.colors.black,
      },
    },
  },
});

export default styles;
