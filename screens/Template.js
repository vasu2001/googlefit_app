import React from 'react';
import {Text, View} from 'react-native';
import Header from '../components/Header';

export default HomeScreen = ({navigation}) => {
  return (
    <>
      <Header navigation={navigation} text="Template" />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Template</Text>
      </View>
    </>
  );
};
