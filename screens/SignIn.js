import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
import {initAxios} from '../axios/axiosConfig';

GoogleSignin.configure({
  scopes: [
    'https://www.googleapis.com/auth/fitness.activity.read',
    'https://www.googleapis.com/auth/fitness.body.read',
    'https://www.googleapis.com/auth/fitness.location.read',
    'https://www.googleapis.com/auth/fitness.nutrition.read',
  ],
});

export default function Signin({signIn}) {
  const [wait, setWait] = useState(true);

  useEffect(() => {
    useEffectFunc();
  }, []);

  const useEffectFunc = async () => {
    try {
      await GoogleSignin.signInSilently();
      const {accessToken} = await GoogleSignin.getTokens();
      signIn(accessToken);
      initAxios(accessToken);
    } catch (err) {
      console.log('[Signin Error]', err);
      setWait(false);
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn(signIn, setWait)}
        disabled={wait}
      />
    </View>
  );
}

googleSignIn = (signIn, setWait) => async () => {
  try {
    setWait(true);
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    console.log('[Signin] Successful');
    const {accessToken} = await GoogleSignin.getTokens();
    signIn(accessToken);
    initAxios(accessToken);
  } catch (error) {
    console.log('[SignIn Error]', error);
    setWait(false);

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};
