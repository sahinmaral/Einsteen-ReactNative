import {View, Text, TextInput} from 'react-native';
import styles from './SignUp.styles';
import Background from '../../components/Background';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import theme from '../../styles/theme';
import BackgroundType from '../../enums/BackgroundType';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useToast} from 'react-native-toast-notifications';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import firebaseErrorMessages from '../../constants/FirebaseErrorMessages';
import {Formik} from 'formik';
import SignUpUserSchema from '../../schemas/SignUpUserSchema';

function SignUp({navigation}) {
  const [fetchResult, setFetchResult] = useState({
    error: null,
    loading: false,
  });

  const toast = useToast();

  const loadingIndicator = useLoadingIndicator(fetchResult.loading);

  const createUserAtAuthentication = async (email, password) => {
    return await auth().createUserWithEmailAndPassword(email, password);
  };

  const saveUsersAdditionalInformations = async (savedUserId, values) => {
    return await firestore().collection('users').doc(savedUserId).set({
      firstName: values.firstName,
      lastName: values.lastName.toUpperCase(),
      email: values.email
    });
  };

  const signUpUser = async values => {
    try {
      setFetchResult({
        ...fetchResult,
        loading: true,
      });

      const savedUser = await createUserAtAuthentication(
        values.email,
        values.password,
      );

      await saveUsersAdditionalInformations(savedUser.user.uid,values);

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
    <View style={styles.mainContainer}>
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
            <View style={{flex: 0.1}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.goBackButton.container}>
                <Text style={styles.goBackButton.text}>Back</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flex: 0.8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.container}>
                <Text style={styles.header}>Sign Up</Text>
                <TextInput
                  style={styles.form.input}
                  placeholderTextColor={theme.colors.darkGrayishRed}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  placeholder="First Name"
                />
                {errors.firstName && touched.firstName ? (
                  <Text style={styles.form.error}>*{errors.firstName}</Text>
                ) : null}
                <TextInput
                  style={styles.form.input}
                  placeholderTextColor={theme.colors.darkGrayishRed}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  placeholder="Last Name"
                />
                {errors.lastName && touched.lastName ? (
                  <Text style={styles.form.error}>*{errors.lastName}</Text>
                ) : null}
                <TextInput
                  style={styles.form.input}
                  placeholderTextColor={theme.colors.darkGrayishRed}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <Text style={styles.form.error}>*{errors.email}</Text>
                ) : null}
                <TextInput
                  style={styles.form.input}
                  placeholderTextColor={theme.colors.darkGrayishRed}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  placeholder="Password"
                />
                {errors.password && touched.password ? (
                  <Text style={styles.form.error}>*{errors.password}</Text>
                ) : null}
                <TextInput
                  style={styles.form.input}
                  placeholderTextColor={theme.colors.darkGrayishRed}
                  onChangeText={handleChange('passwordRepeat')}
                  onBlur={handleBlur('passwordRepeat')}
                  value={values.passwordRepeat}
                  secureTextEntry
                  placeholder="Password repeat"
                />
                {errors.passwordRepeat && touched.passwordRepeat ? (
                  <Text style={styles.form.error}>
                    *{errors.passwordRepeat}
                  </Text>
                ) : null}
              </View>
            </View>

            <TouchableOpacity
              style={styles.submitButton.container}
              onPress={handleSubmit}
              disabled={fetchResult.loading}>
              <Text style={styles.submitButton.text}>OKAY</Text>
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
