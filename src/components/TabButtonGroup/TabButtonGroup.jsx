import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity, View, Text, useWindowDimensions} from 'react-native';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import makeStyles from './TabButtonGroup.styles';

function TabButtonGroup() {
  const navigation = useNavigation();

  const {fontScale} = useWindowDimensions();
  const styles = makeStyles(fontScale);

  const handleTabPress = screenName => {
    navigation.navigate(screenName);
  };

  const renderTabBarIcons = route => {
    let iconName;

    switch (route) {
      case 'Homepage':
        iconName = 'home';
        break;
      case 'UserProfile':
        iconName = 'user';
        break;
      default:
        break;
    }

    return <FeatherIcon name={iconName} color={'white'} size={24} />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleTabPress('Homepage')}
        style={styles.button.container}>
        {renderTabBarIcons('Homepage')}
        <Text style={styles.button.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleTabPress('UserProfile')}
        style={styles.button.container}>
        {renderTabBarIcons('UserProfile')}
        <Text style={styles.button.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TabButtonGroup;
