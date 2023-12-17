import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import styles from './UpdatePassword.styles';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import theme from '../../styles/theme';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import {useState} from 'react';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import UpdatePasswordSchema from '../../schemas/UpdatePasswordSchema';
import auth from '@react-native-firebase/auth';
import {useToast} from 'react-native-toast-notifications';

function UpdatePassword({navigation}) {
  const [isFetchExecuted, setIsFetchExecuted] = useState(false);

  const loadingIndicator = useLoadingIndicator(isFetchExecuted);

  const toast = useToast();

  const updatePassword = async values => {
    try {
      setIsFetchExecuted(true);

      const currentUser = auth().currentUser;

      const credential = auth.EmailAuthProvider.credential(
        currentUser.email,
        values.currentPassword,
      );

      await currentUser.reauthenticateWithCredential(credential);

      await currentUser.updatePassword(values.newPassword);

      setIsFetchExecuted(false);

      toast.show('You successfully updated your password', {
        type: 'success',
        placement: 'top',
      });

      navigation.navigate('UserProfile');
    } catch (error) {
      const errorMessage =
        error.code === 'auth/invalid-credential'
          ? 'You have entered your current password wrong'
          : error.message;

      toast.show(errorMessage, {
        type: 'warning',
        placement: 'top',
      });

      setIsFetchExecuted(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          newPasswordRepeat: '',
        }}
        validationSchema={UpdatePasswordSchema}
        onSubmit={updatePassword}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <Background type={BackgroundType.Main}>
            <View style={{flex: 1}}>
              <View style={styles.form.container}>
                <Text style={styles.header.text}>Update Password</Text>

                <TextInput
                  onChangeText={handleChange('currentPassword')}
                  onBlur={handleBlur('currentPassword')}
                  value={values.currentPassword}
                  secureTextEntry
                  placeholder="Current Password"
                  style={styles.form.input.container}
                  placeholderTextColor={theme.colors.white}
                />

                {errors.currentPassword && touched.currentPassword ? (
                  <Text style={styles.form.error}>
                    *{errors.currentPassword}
                  </Text>
                ) : null}

                <TextInput
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  secureTextEntry
                  placeholder="New Password"
                  style={styles.form.input.container}
                  placeholderTextColor={theme.colors.white}
                />

                {errors.newPassword && touched.newPassword ? (
                  <Text style={styles.form.error}>*{errors.newPassword}</Text>
                ) : null}

                <TextInput
                  onChangeText={handleChange('newPasswordRepeat')}
                  onBlur={handleBlur('newPasswordRepeat')}
                  value={values.newPasswordRepeat}
                  secureTextEntry
                  placeholder="New Password Repeat"
                  style={styles.form.input.container}
                  placeholderTextColor={theme.colors.white}
                />

                {errors.newPasswordRepeat && touched.newPasswordRepeat ? (
                  <Text style={styles.form.error}>
                    *{errors.newPasswordRepeat}
                  </Text>
                ) : null}
              </View>

              <View style={{flex: 0.1, justifyContent: 'flex-end'}}>
                <TouchableOpacity
                  style={styles.form.submitButton.container}
                  onPress={handleSubmit}
                  disabled={isFetchExecuted}>
                  <Text style={styles.form.submitButton.text}>OKAY</Text>
                  {isFetchExecuted && (
                    <View
                      style={{
                        transform: [
                          {rotate: `${loadingIndicator.rotation}deg`},
                        ],
                      }}>
                      <FeatherIcon name="rotate-cw" color={'white'} size={24} />
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Background>
        )}
      </Formik>
    </View>
  );
}

export default UpdatePassword;
