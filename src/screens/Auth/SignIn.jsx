import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {backgroundStyles} from '../../assets/styling/backgroundstyles';
import {SignInStyles} from '../../assets/styling/sign-styles';
import login from '../../api/login/login-api';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {constants} from '../../constants/consants';
import {useDispatch, useSelector} from 'react-redux';
import {setCredentials} from '../../redux/reducers';
import Loading from '../../components/Loading';
import {setCredentialAsync} from '../../functions/asnyc';
import jwtDecode from 'jwt-decode';
const SignIn = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const Dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const Cred = useSelector(state => state.Cred);
  async function SignIn() {
    setloading(true);
    try {
      const resp = await login(userId, password);
      const decode = jwtDecode(resp.token)
      const UserDetails = await getMemberDetail(decode.sub,resp.token);
      Dispatch(setCredentials({
        token:resp.token,
        ...UserDetails,
        ...decode
      }))
      await setCredentialAsync(resp.token);
      Dispatch(
        setCredentials({
          token: resp.token,
        }),
      );
    } catch (er) {
      if (er.code === 'ERR_NETWORK') {
        Alert.alert(
          'Network Error',
          ' Please check your internet connection and try again.',
        );
      } else if (er.code === 'ERR_BAD_REQUEST') {
        Alert.alert(
          'User Not Found',
          'This user is not registered with us or Invalid Password or User Id',
        );
      } else {
        Alert.alert(
          'Something Went Wrong',
          "Sorry we can't process request at this moment. Please try after some time with Stable internet connection and correct credentials",
        );
      }
    }
    setloading(false);
  }
  return (
    <>
      {loading ? (
        <Loading text={'Please wait while logging ..'} />
      ) : (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
          <KeyboardAwareScrollView
            bounces={false}
            contentContainerStyle={[
              backgroundStyles.whiteBackground,
              SignInStyles.center,
            ]}>
            <Image
              source={require('../../assets/images/icon.png')}
              resizeMode="contain"
              style={{width: 200, height: 200,marginBottom:-10}}
            />
            <Text
              style={[
                SignInStyles.textHead,
                {color: 'black', marginTop: 0, marginBottom: 20},
              ]}>
              {constants.applicationName} {'\n'}Let's Management Better
            </Text>
            <View style={SignInStyles.card}>
              <Text style={SignInStyles.textHead}>Sign In</Text>
              <Text style={SignInStyles.texTitle}>
                Access To Your Dashboard
              </Text>
              <View style={SignInStyles.subViewStyles}>
                <Text style={SignInStyles.subHeaderText}>User Id</Text>
                <TextInput
                  value={userId}
                  onChangeText={e => setUserId(e)}
                  style={SignInStyles.textInput}
                  placeholder="Email or Number"
                />
              </View>
              <View style={SignInStyles.subViewStyles}>
                <Text style={SignInStyles.subHeaderText}>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={e => setPassword(e)}
                  style={SignInStyles.textInput}
                  placeholder="Password"
                />
              </View>
              <TouchableOpacity
                onPress={SignIn}
                style={SignInStyles.signInButtonContainer}>
                <Text
                  style={[
                    SignInStyles.textHead,
                    {color: 'black', fontSize: 18, marginTop: 0},
                  ]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default SignIn;
