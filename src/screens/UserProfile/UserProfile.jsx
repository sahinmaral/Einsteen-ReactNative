import {View, Text, TouchableOpacity, Image} from 'react-native';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import styles from './UserProfile.styles';
import {useDispatch, useSelector} from 'react-redux';
import defaultUserThumbnail from '../../../assets/images/defaultUserThumbnail.png';
import theme from '../../styles/theme';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';

function UserProfile({route, navigation}) {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  return (
    <View style={styles.mainContainer}>
      <Background type={BackgroundType.Main}>
        <View style={{flex: 1}}>
          <View style={{flex: 0.4}}>
            <View
              style={{
                flex: 0.5,
                backgroundColor: theme.colors.darkPurple,
              }}></View>
            <View
              style={{flex: 0.5, backgroundColor: theme.colors.white}}></View>
          </View>

          <View style={styles.header.informations.container}>
            <Image
              style={styles.header.informations.thumbnail}
              source={defaultUserThumbnail}
            />
            <Text
              style={[
                styles.header.informations.text,
                {color: theme.colors.darkPurple},
              ]}>
              {user.firstName} {user.lastName}
            </Text>
            <Text
              style={[
                styles.header.informations.text,
                {color: theme.colors.black},
              ]}>
              {user.email}
            </Text>
          </View>

          <View style={styles.buttonGroup.container}>
            <View style={styles.buttonGroup.row}>
              <TouchableOpacity style={styles.buttonGroup.button.container}>
                <FeatherIcon name={'key'} color={'white'} size={36} />
                <Text style={styles.buttonGroup.button.text}>
                  Change Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonGroup.button.container}>
                <FeatherIcon name={'camera'} color={'white'} size={36} />
                <Text style={styles.buttonGroup.button.text}>
                  Change Profile Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    </View>
  );
}

export default UserProfile;
