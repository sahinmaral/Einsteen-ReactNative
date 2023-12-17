import {View, Text, TextInput} from 'react-native';
import styles from './Login.styles';
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
import LoginUserSchema from '../../schemas/LoginUserSchema';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/slices/authSlice';
import {mapFirebaseDocumentObjectWithId} from '../../helpers/objectMethods';

function Login({navigation}) {
  const [fetchResult, setFetchResult] = useState({
    error: null,
    loading: false,
  });

  const toast = useToast();

  const dispatch = useDispatch();

  const loadingIndicator = useLoadingIndicator(fetchResult.loading);

  const loginUserWithAuthentication = async (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
  };

  const getUsersAdditionalInformations = async savedUserId => {
    return await firestore().collection('users').doc(savedUserId).get();
  };

  const loginUser = async values => {
    try {
      setFetchResult({
        ...fetchResult,
        loading: true,
      });

      const savedUser = await loginUserWithAuthentication(
        values.email,
        values.password,
      );

      const savedUserAdditionalInformationsDocumentSnapshot =
        await getUsersAdditionalInformations(savedUser.user.uid);

      const savedUserAdditionalInformations = mapFirebaseDocumentObjectWithId(
        savedUserAdditionalInformationsDocumentSnapshot,
      );

      setFetchResult({
        ...fetchResult,
        loading: false,
      });

      dispatch(
        setUser({
          id: savedUser.user.uid,
          email: values.email,
          photoURL: savedUser.user.photoURL,
          firstName: savedUserAdditionalInformations.firstName,
          lastName: savedUserAdditionalInformations.lastName,
        }),
      );

      toast.show('You successfully logged in', {
        type: 'success',
        placement: 'top',
      });

      navigation.navigate('App');
    } catch (error) {
      const errorMessage = Object.keys(firebaseErrorMessages.en).includes(
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
          email: 'sahin.maral@hotmail.com',
          password: 'Abc1234.',
        }}
        validationSchema={LoginUserSchema}
        onSubmit={loginUser}>
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
                <Text style={styles.header}>Login</Text>
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

export default Login;
