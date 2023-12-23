import {View, Text, TouchableOpacity, Image} from 'react-native';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import styles from './UserProfile.styles';
import {useDispatch, useSelector} from 'react-redux';
import defaultUserThumbnail from '../../../assets/images/defaultUserThumbnail.png';
import theme from '../../styles/theme';
import {default as MaterialCommunityIcons} from 'react-native-vector-icons/MaterialCommunityIcons';
import {openModalByType} from '../../redux/slices/modalSlice';
import ModalType from '../../enums/ModalType';
import {useMemo} from 'react';
import auth from '@react-native-firebase/auth';
import {useToast} from 'react-native-toast-notifications';

function UserProfile({navigation}) {
  const {user} = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const toast = useToast();

  const userProfileThumbnailSource = useMemo(() => {
    return !user.photoURL ? defaultUserThumbnail : {uri: user.photoURL};
  }, [user.photoURL]);

  const isUserSigningInWithPassword = useMemo(() => {
    return auth().currentUser.providerData[0].providerId === 'password';
  }, [auth]);

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
            <View>
              <Image
                style={styles.header.informations.thumbnail}
                source={userProfileThumbnailSource}
              />
              <TouchableOpacity
                onPress={() => {
                  if (!isUserSigningInWithPassword) {
                    toast.show(
                      'You have to change your photo which provider are you signing in',
                      {
                        type: 'warning',
                        placement: 'top',
                      },
                    );
                  } else {
                    dispatch(openModalByType(ModalType.UpdateProfilePhoto));
                  }
                }}
                style={styles.updateProfilePhotoButton}>
                <MaterialCommunityIcons
                  name={'camera-plus'}
                  color={'black'}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
          </View>

          <View style={styles.menu.container}>
            {isUserSigningInWithPassword ? (
              <TouchableOpacity
                style={styles.menu.button.container}
                onPress={() => navigation.navigate('UpdatePassword')}>
                <MaterialCommunityIcons
                  name={'lock'}
                  color={'black'}
                  size={25}
                />
                <Text style={styles.menu.button.text}>Change Password</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity style={styles.menu.button.container}>
              <MaterialCommunityIcons
                name={'format-list-numbered'}
                color={'black'}
                size={25}
              />
              <Text style={styles.menu.button.text}>See High Scores</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    </View>
  );
}

export default UserProfile;
