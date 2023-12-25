import {StyleSheet} from 'react-native';
import theme from '../../styles/theme';

const baseButton = {
  container: {
    height: 45,
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
};

const styles = StyleSheet.create({
  modal: {
    buttonGroup: {
      container: {
        gap: 10,
        flex: 1,
      },
      optionButton: {
        container: {
          ...baseButton.container,
        },
        text: {...baseButton.text},
      },
      uploadPhotoButton: {
        container: {
          ...baseButton.container,
          backgroundColor: theme.colors.lightGreen,
          width: '48%',
          height: 50,
          padding: 0,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        },
      },
      deleteSelectedPhotoButton: {
        container: {
          ...baseButton.container,
          backgroundColor: theme.colors.lightRed,
          width: '48%',
          height: 50,
          padding: 0,
          justifyContent: 'center',
        },
      },
      selectPhotoButton: {
        container: {
          ...baseButton.container,
          backgroundColor: theme.colors.veryDarkPink,
          justifyContent: 'center',
          height: 50,
        },
      },
    },
  },
});

export default styles;
