import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import makeStyles from './SignUp.styles';
import Background from '../../components/Background';
import {useState} from 'react';
import theme from '../../styles/theme';
import BackgroundType from '../../enums/BackgroundType';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import {useToast} from 'react-native-toast-notifications';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import firebaseErrorMessages from '../../constants/FirebaseErrorMessages';
import GoBackButton from '../../components/GoBackButton';
import SignUpUserSchema from '../../schemas/SignUpUserSchema';
import {Formik} from 'formik';
import makeBaseStyles from '../../styles/baseStyles';
import {saveUsersAdditionalInformations} from '../../services/firebase/FirestoreService';
import {createUser} from '../../services/firebase/AuthService';

function SignUp({navigation}) {
  const [fetchResult, setFetchResult] = useState({
    error: null,
    loading: false,
  });

  const toast = useToast();

  const loadingIndicator = useLoadingIndicator(fetchResult.loading);
  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);
  const styles = makeStyles(fontScale);

  const signUpUser = async values => {
    try {
      setFetchResult({
        ...fetchResult,
        loading: true,
      });

      const savedUser = await createUser(values.email, values.password);

      await saveUsersAdditionalInformations(savedUser.user.uid, values);

      setFetchResult({
        ...fetchResult,
        loading: false,
      });

      toast.show('You successfully signed up', {
        type: 'success',
        placement: 'top',
      });

      navigation.navigate('Welcome');
    } catch (error) {
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
    }
  };

  return (
    <View style={baseStyles.mainContainer}>
      <Formik
        initialValues={{
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          password: '',
          passwordRepeat: '',
        }}
        validationSchema={SignUpUserSchema}
        onSubmit={signUpUser}>
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

            <KeyboardAvoidingView behavior={'padding'} style={{flex: 0.8}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <View style={baseStyles.form.auth.container}>
                    <Text style={styles.header}>Sign Up</Text>
                    <TextInput
                      style={baseStyles.form.auth.input}
                      placeholderTextColor={theme.colors.darkGrayishRed}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                      placeholder="First Name"
                    />
                    {errors.firstName && touched.firstName ? (
                      <Text style={baseStyles.form.error}>
                        *{errors.firstName}
                      </Text>
                    ) : null}
                    <TextInput
                      style={baseStyles.form.auth.input}
                      placeholderTextColor={theme.colors.darkGrayishRed}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                      placeholder="Last Name"
                    />
                    {errors.lastName && touched.lastName ? (
                      <Text style={baseStyles.form.error}>
                        *{errors.lastName}
                      </Text>
                    ) : null}
                    <TextInput
                      style={baseStyles.form.auth.input}
                      placeholderTextColor={theme.colors.darkGrayishRed}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      placeholder="Email"
                    />
                    {errors.email && touched.email ? (
                      <Text style={baseStyles.form.error}>*{errors.email}</Text>
                    ) : null}
                    <TextInput
                      style={baseStyles.form.auth.input}
                      placeholderTextColor={theme.colors.darkGrayishRed}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry
                      placeholder="Password"
                    />
                    {errors.password && touched.password ? (
                      <Text style={baseStyles.form.error}>
                        *{errors.password}
                      </Text>
                    ) : null}
                    <TextInput
                      style={baseStyles.form.auth.input}
                      placeholderTextColor={theme.colors.darkGrayishRed}
                      onChangeText={handleChange('passwordRepeat')}
                      onBlur={handleBlur('passwordRepeat')}
                      value={values.passwordRepeat}
                      secureTextEntry
                      placeholder="Password repeat"
                    />
                    {errors.passwordRepeat && touched.passwordRepeat ? (
                      <Text style={baseStyles.form.error}>
                        *{errors.passwordRepeat}
                      </Text>
                    ) : null}
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity
              style={baseStyles.button.submitButton.container}
              onPress={handleSubmit}
              disabled={fetchResult.loading}>
              <Text style={baseStyles.button.submitButton.text}>OKAY</Text>
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

export default SignUp;
