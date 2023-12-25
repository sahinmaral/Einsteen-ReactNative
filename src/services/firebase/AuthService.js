import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const createUser = async (email, password) => {
  return await auth().createUserWithEmailAndPassword(email, password);
};

const loginUser = async (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const getCurrentUser = () => {
  return auth().currentUser;
}

const signOut = () => {
  return auth().signOut()
}

const googleSignOut = () => {
  return GoogleSignin.signOut()
}

export {createUser, loginUser, getCurrentUser, signOut, googleSignOut};
