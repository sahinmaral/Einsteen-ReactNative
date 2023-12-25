import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import makeBaseStyles from '../../styles/baseStyles';
import {useNavigation} from '@react-navigation/native';

function GoBackButton({action}) {
  const navigation = useNavigation();
  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);

  const handlePress = () => {
    if (action) {
      action();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={{flex: 0.1}}>
      <TouchableOpacity
        onPress={handlePress}
        style={baseStyles.button.goBackButton.container}>
        <Text style={baseStyles.button.goBackButton.text}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default GoBackButton;
