import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import GoogleFit from './navigators/GoogleFit';
import Signin from './screens/SignIn';
import {GoogleSignin} from 'react-native-google-signin';

export default function App() {
  const [accessToken, setAccessToken] = useState(null);
  return (
    <NavigationContainer>
      {accessToken !== null ? (
        <GoogleFit
          logout={() => {
            GoogleSignin.signOut();
            setAccessToken(null);
          }}
          accessToken={accessToken}
        />
      ) : (
        <Signin signIn={(accessToken) => setAccessToken(accessToken)} />
      )}
    </NavigationContainer>
  );
}
