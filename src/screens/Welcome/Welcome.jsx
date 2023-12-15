import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import theme from '../../styles/theme';
import styles from './Welcome.styles';
import Background from '../../components/Background/Background';
import BackgroundType from '../../enums/BackgroundType';

function Welcome({navigation}) {
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
            <TouchableOpacity style={styles.buttonGroup.button.container}>
              <Text style={styles.buttonGroup.button.text}>
                Login with Google
              </Text>
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
