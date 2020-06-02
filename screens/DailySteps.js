import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import Header from '../components/Header';
import axios from '../axios/axiosConfig';
import moment from 'moment';
import {BarChart} from 'react-native-chart-kit';

const FetchData = async (setData) => {
  try {
    const res = await axios.post('/fitness/v1/users/me/dataset:aggregate', {
      aggregateBy: [
        {
          dataTypeName: 'com.google.step_count.delta',
          dataSourceId:
            'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps',
        },
      ],
      bucketByTime: {durationMillis: 86400000},
      // startTimeMillis: moment('20-10-2016', 'DD-MM-YYYY').valueOf(),
      // endTimeMillis: moment('26-10-2016', 'DD-MM-YYYY').valueOf(),
      endTimeMillis: moment().valueOf(),
      startTimeMillis: moment().subtract(6, 'days').startOf('day').valueOf(),
    });

    let data = {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    };

    Array.from(res.data.bucket).forEach((element) => {
      // console.log('[element]', JSON.stringify(element));
      data.labels.push(
        moment(parseInt(element.startTimeMillis)).format('DD-MM-YY'),
      );
      data.datasets[0].data.push(
        element.dataset[0].point[0] === undefined
          ? 0
          : parseInt(element.dataset[0].point[0].value[0].intVal),
      );
    });

    setData(data);
    console.log('[DailySteps] data fetched');
    // console.log(JSON.stringify(data));
  } catch (error) {
    console.log('[StepsFetchError]', JSON.stringify(error));
  }
};

export default DailySteps = ({navigation}) => {
  const [data, setData] = useState({});

  useEffect(() => {
    FetchData(setData);
  }, []);

  return (
    <>
      <Header navigation={navigation} text="Daily Steps" />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {data.labels !== undefined && (
          <BarChart
            data={data}
            width={Dimensions.get('window').width - 20} // from react-native
            height={500}
            verticalLabelRotation={45}
            xLabelsOffset={-15}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#1D3354',
              backgroundGradientTo: '#467599',
              decimalPlaces: '0', // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#D64045',
              },
            }}
            bezier
            fromZero
            style={{
              margin: 10,
              borderRadius: 16,
              elevation: 5,
              padding: 5,
            }}
          />
        )}
      </View>
    </>
  );
};
