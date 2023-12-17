import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import Background from '../../components/Background';
import BackgroundType from '../../enums/BackgroundType';
import styles from './UpdateProfilePhoto.styles';
import {useSelector} from 'react-redux';
import useLoadingIndicator from '../../hooks/useLoadingIndicator';
import {useState} from 'react';
import {default as FeatherIcon} from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';
import {useToast} from 'react-native-toast-notifications';

function UpdateProfilePhoto({navigation}) {
  const [isFetchExecuted, setIsFetchExecuted] = useState(false);

  const loadingIndicator = useLoadingIndicator(isFetchExecuted);

  const toast = useToast();

  return (
    <View style={styles.mainContainer}>
      <Background type={BackgroundType.Main}>
        <View style={{flex: 1}}>
          <View style={styles.form.container}>
            <Text style={styles.header.text}>Update Profile Photo</Text>
          </View>

          <View style={{flex: 0.1, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={styles.form.submitButton.container}
              disabled={isFetchExecuted}>
              <Text style={styles.form.submitButton.text}>OKAY</Text>
              {isFetchExecuted && (
                <View
                  style={{
                    transform: [{rotate: `${loadingIndicator.rotation}deg`}],
                  }}>
                  <FeatherIcon name="rotate-cw" color={'white'} size={24} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    </View>
  );
}

export default UpdateProfilePhoto;
