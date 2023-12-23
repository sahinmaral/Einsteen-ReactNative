import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import theme from '../../styles/theme';
import styles from './Welcome.styles';
import Background from '../../components/Background/Background';
import BackgroundType from '../../enums/BackgroundType';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {useToast} from 'react-native-toast-notifications';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import {setUser} from '../../redux/slices/authSlice';
import {GOOGLE_WEB_CLIENT_ID} from "@env"

function Welcome({navigation}) {
  const dispatch = useDispatch();
  const toast = useToast();

  const [fetchResult, setFetchResult] = useState(false);
  const loadingIndicator = useLoadingIndicator(fetchResult);

  const signInWithGoogle = async () => {
    try {
      setFetchResult(true);

      GoogleSignin.configure({
        offlineAccess: false,
        webClientId: GOOGLE_WEB_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      if (userCredential.additionalUserInfo.isNewUser) {
        await firestore().collection('users').doc(userCredential.user.uid).set({
          firstName: userCredential.additionalUserInfo.profile.given_name,
          lastName: userCredential.additionalUserInfo.profile.family_name,
          email: userCredential.additionalUserInfo.profile.email,
          photoURL: userCredential.additionalUserInfo.profile.picture,
        });
      }

      dispatch(
        setUser({
          id: userCredential.user.uid,
          email: userCredential.additionalUserInfo.profile.email,
          photoURL: userCredential.additionalUserInfo.profile.picture,
          firstName: userCredential.additionalUserInfo.profile.given_name,
          lastName: userCredential.additionalUserInfo.profile.family_name,
        }),
      );

      setFetchResult(false);

      toast.show('You successfully logged in with Google', {
        type: 'success',
        placement: 'top',
      });

      navigation.navigate('App');
    } catch (error) {
      console.log(error);

      toast.show(
        'Error during signing in with Google. Please try again later.',
        {
          type: 'warning',
          placement: 'top',
        },
      );
      setFetchResult(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Background type={BackgroundType.Auth}>
        <View style={styles.container}>
          <View style={styles.logo.container}>
            <View style={styles.logo.row}>
              <Text
                style={[styles.logo.firstHeader, {color: theme.colors.white}]}>
                EINS
              </Text>
              <Text
                style={[
                  styles.logo.firstHeader,
                  {color: theme.colors.darkPurple},
                ]}>
                TEEN
              </Text>
            </View>

            <View style={[styles.logo.row, {gap: 30}]}>
              <Text style={styles.logo.secondHeader}>Q</Text>
              <Text style={styles.logo.secondHeader}>U</Text>
              <Text style={styles.logo.secondHeader}>I</Text>
              <Text style={styles.logo.secondHeader}>Z</Text>
            </View>
          </View>

          <View style={styles.buttonGroup.container}>
            <TouchableOpacity style={styles.buttonGroup.button.container}>
              <Text
                style={styles.buttonGroup.button.text}
                onPress={() => navigation.navigate('Login')}>
                Login with email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonGroup.button.container,
                {flexDirection: 'row', gap: 10},
              ]}
              onPress={signInWithGoogle}>
              <Text style={styles.buttonGroup.button.text}>
                Login with Google
              </Text>
              {fetchResult && (
                <View
                  style={{
                    transform: [{rotate: `${loadingIndicator.rotation}deg`}],
                  }}>
                  <FeatherIcon name="rotate-cw" color={'black'} size={24} />
                </View>
              )}
            </TouchableOpacity>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={{color: theme.colors.white}}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text
                  style={{color: theme.colors.white}}
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    </View>
  );
}

export default Welcome;
