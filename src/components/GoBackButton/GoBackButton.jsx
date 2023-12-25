import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import baseStyles from '../../styles/baseStyles';
import {useNavigation} from '@react-navigation/native';

function GoBackButton({action}) {
  const navigation = useNavigation();

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
