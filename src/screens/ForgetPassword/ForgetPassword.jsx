import {View, Text, TextInput, useWindowDimensions} from 'react-native';
import makeStyles from './ForgetPassword.styles';
import makeBaseStyles from '../../styles/baseStyles';
import Background from '../../components/Background';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import theme from '../../styles/theme';
import BackgroundType from '../../enums/BackgroundType';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import {useToast} from 'react-native-toast-notifications';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import firebaseErrorMessages from '../../constants/FirebaseErrorMessages';
import {Formik} from 'formik';
import ForgetPasswordSchema from '../../schemas/ForgetPasswordSchema';
import GoBackButton from '../../components/GoBackButton';

function ForgetPassword({navigation}) {
  const [fetchResult, setFetchResult] = useState({
    error: null,
    loading: false,
  });

  const toast = useToast();

  const loadingIndicator = useLoadingIndicator(fetchResult.loading);

  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);
  const styles = makeStyles(fontScale);

  const sendPasswordResetLink = values => {
    setFetchResult({
      ...fetchResult,
      loading: true,
    });

    auth()
      .sendPasswordResetEmail(values.email)
      .then(() => {
        setFetchResult({
          ...fetchResult,
          loading: false,
        });

        toast.show('Password reset link has successfully sent', {
          type: 'success',
          placement: 'top',
        });

        navigation.navigate('Welcome');
      })
      .catch(error => {
        let errorMessage = Object.keys(firebaseErrorMessages.en).includes(
          error.code,
        )
          ? firebaseErrorMessages.en[error.code]
          : JSON.stringify(error);

        setFetchResult({
          error: errorMessage,
          loading: false,
        });

        toast.show(errorMessage, {
          type: 'warning',
          placement: 'top',
        });
      });
  };

  return (
    <View style={baseStyles.mainContainer}>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={ForgetPasswordSchema}
        onSubmit={sendPasswordResetLink}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <Background type={BackgroundType.Auth}>
            <GoBackButton />

            <View
              style={{
                flex: 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={[baseStyles.form.auth.container, {gap: 5}]}>
                <Text style={styles.header}>Forget Password</Text>
                <Text style={styles.information}>
                  * Please enter the email address yo'd like your password reset
                  information sent to
                </Text>
                <TextInput
                  style={[
                    baseStyles.form.input,
                    {
                      borderBottomColor: theme.colors.darkGrayishRed,
                      borderBottomWidth: 1,
                      paddingHorizontal: 0,
                      paddingBottom: 5,
                    },
                  ]}
                  placeholderTextColor={theme.colors.darkGrayishRed}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <Text style={baseStyles.form.error}>*{errors.email}</Text>
                ) : null}
              </View>
            </View>

            <TouchableOpacity
              style={baseStyles.button.submitButton.container}
              onPress={handleSubmit}
              disabled={fetchResult.loading}>
              <Text style={baseStyles.button.submitButton.text}>
                SEND RESET LINK
              </Text>
              {fetchResult.loading && (
                <View
                  style={{
                    transform: [{rotate: `${loadingIndicator.rotation}deg`}],
                  }}>
                  <FeatherIcon name="rotate-cw" color={'white'} size={24} />
                </View>
              )}
            </TouchableOpacity>
          </Background>
        )}
      </Formik>
    </View>
  );
}

export default ForgetPassword;
