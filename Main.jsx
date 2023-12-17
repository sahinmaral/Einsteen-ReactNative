import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import Welcome from './src/screens/Welcome';
import SignUp from './src/screens/SignUp';
import CategoriesOfQuestion from './src/screens/CategoriesOfQuestion';
import TabButtonGroup from './src/components/TabButtonGroup';
import ChosenCategory from './src/screens/ChosenCategory';
import QuizSolving from './src/screens/QuizSolving';
import ResultOfQuiz from './src/screens/ResultOfQuiz';
import Scoreboard from './src/screens/Scoreboard';
import ForgetPassword from './src/screens/ForgetPassword';
import Login from './src/screens/Login';
import UserProfile from './src/screens/UserProfile';
import UpdatePassword from './src/screens/UpdatePassword';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './src/redux/store';
import {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import auth from '@react-native-firebase/auth';
import {removeUser} from './src/redux/slices/authSlice';
import ModalNavigator from './src/components/ModalNavigator/ModalNavigator';

const Stack = createStackNavigator();

function AppTabNavigatorRoutes({route}) {
  const notDesiredAreasToShowTab = ['QuizSolving', 'ResultOfQuiz'];

  const focusedRouteName = getFocusedRouteNameFromRoute(route);

  const shouldHideTab = useMemo(() => {
    return notDesiredAreasToShowTab.includes(focusedRouteName);
  }, [focusedRouteName]);

  return (
    <View style={{flex: 1}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Homepage" component={CategoriesOfQuestion} />
        <Stack.Screen name="ChosenCategory" component={ChosenCategory} />
        <Stack.Screen name="QuizSolving" component={QuizSolving} />
        <Stack.Screen name="ResultOfQuiz" component={ResultOfQuiz} />
        <Stack.Screen name="Scoreboard" component={Scoreboard} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      </Stack.Navigator>
      <ModalNavigator currentRoute={focusedRouteName} />
      {!shouldHideTab && <TabButtonGroup />}
    </View>
  );
}

function MainStackNavigatorRoutes() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.auth);

  const [loggedIn, setLoggedIn] = useState(false);

  function onAuthStateChanged(user) {
    setLoggedIn(user !== null);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      navigation.navigate('Welcome');
      dispatch(removeUser());
    }
  }, [loggedIn, user, navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      {loggedIn ? (
        <Stack.Screen name="App" component={AppTabNavigatorRoutes} />
      ) : null}
    </Stack.Navigator>
  );
}

function Main() {
  return (
    <ToastProvider>
      <Provider store={store}>
        <NavigationContainer>
          <MainStackNavigatorRoutes />
        </NavigationContainer>
      </Provider>
    </ToastProvider>
  );
}

export default Main;
