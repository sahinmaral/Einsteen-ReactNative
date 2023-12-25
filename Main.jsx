import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import ForgetPassword from './src/screens/ForgetPassword';
import CategoriesOfQuestion from './src/screens/CategoriesOfQuestion';
import TabButtonGroup from './src/components/TabButtonGroup';
import UserProfile from './src/screens/UserProfile';
import ChosenCategory from './src/screens/ChosenCategory';
import Scoreboard from './src/screens/Scoreboard';
import QuizSolving from './src/screens/QuizSolving';
import UpdatePassword from './src/screens/UpdatePassword';
import ScoreboardOfUser from './src/screens/ScoreboardOfUser';
import CheckInternet from './src/screens/CheckInternet';
import ResultOfQuiz from './src/screens/ResultOfQuiz';
import ModalNavigator from './src/components/ModalNavigator';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './src/redux/store';
import {useEffect, useMemo, useState} from 'react';
import {View} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import auth from '@react-native-firebase/auth';
import {removeUser} from './src/redux/slices/authSlice';
import SplashScreen from 'react-native-splash-screen';
import useCheckInternet from './src/hooks/useCheckInternet';

const Stack = createStackNavigator();

function AppTabNavigatorRoutes({route}) {
  const notDesiredAreasToShowTab = [
    'QuizSolving',
    'ResultOfQuiz',
    'UpdatePassword',
    'Scoreboard',
    'ScoreboardOfUser',
  ];

  const focusedRouteName = getFocusedRouteNameFromRoute(route);

  const shouldHideTab = useMemo(() => {
    return notDesiredAreasToShowTab.includes(focusedRouteName);
  }, [focusedRouteName]);

  return (
    <View style={{flex: 1}}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Homepage" component={CategoriesOfQuestion} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="ChosenCategory" component={ChosenCategory} />
        <Stack.Screen name="Scoreboard" component={Scoreboard} />
        <Stack.Screen name="QuizSolving" component={QuizSolving} />
        <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
        <Stack.Screen name="ScoreboardOfUser" component={ScoreboardOfUser} />
        <Stack.Screen name="ResultOfQuiz" component={ResultOfQuiz} />
      </Stack.Navigator>
      <ModalNavigator currentRoute={focusedRouteName} />
      {!shouldHideTab && <TabButtonGroup />}
    </View>
  );
}

function MainStackNavigatorRoutes() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.user);

  const [loggedIn, setLoggedIn] = useState(false);

  const isConnected = useCheckInternet();

  function onAuthStateChanged(user) {
    setLoggedIn(user !== null);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }

    return subscriber;
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      navigation.navigate('Welcome');
      dispatch(removeUser());
    }
  }, [user, navigation]);

  useEffect(() => {
    if (!isConnected) {
      navigation.reset({
        index: 0,
        routes: [{name: 'CheckInternet'}],
      });
    }
  }, [isConnected,navigation]);

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="CheckInternet" component={CheckInternet} />
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
