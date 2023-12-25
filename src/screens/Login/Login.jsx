import {View, Text, TextInput, useWindowDimensions} from 'react-native';
import makeStyles from './Login.styles';
import Background from '../../components/Background';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import theme from '../../styles/theme';
import BackgroundType from '../../enums/BackgroundType';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import {useToast} from 'react-native-toast-notifications';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import firebaseErrorMessages from '../../constants/FirebaseErrorMessages';
import {Formik} from 'formik';
import LoginUserSchema from '../../schemas/LoginUserSchema';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/slices/authSlice';
import {mapFirebaseDocumentObjectWithId} from '../../helpers/objectMethods';
import makeBaseStyles from '../../styles/baseStyles';
import GoBackButton from '../../components/GoBackButton';
import {getUserAdditionalInformationsByUserId} from '../../services/firebase/FirestoreService';
import {loginUser} from '../../services/firebase/AuthService';

function Login({navigation}) {
  const [fetchResult, setFetchResult] = useState(false);

  const toast = useToast();

  const dispatch = useDispatch();

  const loadingIndicator = useLoadingIndicator(fetchResult);
  const {fontScale} = useWindowDimensions();
  const baseStyles = makeBaseStyles(fontScale);
  const styles = makeStyles(fontScale);

  const handleLoginUser = async values => {
    try {
      setFetchResult(true);

      const savedUser = await loginUser(values.email, values.password);

      const savedUserAdditionalInformationsDocumentSnapshot =
        await getUserAdditionalInformationsByUserId(savedUser.user.uid);

      const savedUserAdditionalInformations = mapFirebaseDocumentObjectWithId(
        savedUserAdditionalInformationsDocumentSnapshot,
      );

      setFetchResult(false);

      dispatch(
        setUser({
          id: savedUser.user.uid,
          email: savedUser.user.email,
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

      setFetchResult(false);

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
          email: '',
          password: '',
        }}
        validationSchema={LoginUserSchema}
        onSubmit={handleLoginUser}>
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
              <View style={baseStyles.form.auth.container}>
                <Text style={styles.header}>Login</Text>
                <TextInput
                  style={baseStyles.form.auth.input}
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
                  style={baseStyles.form.auth.input}
                  placeholderTextColor={theme.colors.darkGrayishRed}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  placeholder="Password"
                />
                {errors.password && touched.password ? (
                  <Text style={baseStyles.form.error}>*{errors.password}</Text>
                ) : null}
              </View>
            </View>

            <TouchableOpacity
              style={baseStyles.button.submitButton.container}
              onPress={handleSubmit}
              disabled={fetchResult}>
              <Text style={baseStyles.button.submitButton.text}>OKAY</Text>
              {fetchResult && (
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
