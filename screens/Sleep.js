import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Header from '../components/Header';
import axios from '../axios/axiosConfig';
import moment from 'moment';
import {} from 'react-native-chart-kit';

const FetchData = async () => {
  try {
    const sessionRes = await axios.get('/fitness/v1/users/me/sessions', {
      params: {
        startTime:
          moment().subtract(3, 'days').format('YYYY-MM-DD') + 'T00:00:00.000Z',
        endTime:
          moment().add(3, 'days').format('YYYY-MM-DD') + 'T23:59:59.999Z',
        activityType: '72',
      },
    });
    console.log(JSON.stringify(sessionRes));
    console.log(
      moment().subtract(3, 'days').valueOf(),
      moment().add(1, 'days').valueOf(),
    );
  } catch (error) {
    console.log('[SleepFetchError]', JSON.stringify(error));
  }
};

export default Sleep = ({navigation}) => {
  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      <Header navigation={navigation} text="Sleep Activity" />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Sleep Activity</Text>
      </View>
    </>
  );
};
